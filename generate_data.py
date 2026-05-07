import zipfile, xml.etree.ElementTree as ET, json

z = zipfile.ZipFile('K2_Compliance_Catalog_v1.xlsx')

def get_strings():
    ss_xml = z.read('xl/sharedStrings.xml')
    root = ET.fromstring(ss_xml)
    ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    strings = []
    for si in root.findall('.//ns:si', ns):
        text_parts = []
        for t in si.findall('.//ns:t', ns):
            if t.text:
                text_parts.append(t.text)
        strings.append(''.join(text_parts))
    return strings

strings = get_strings()

def parse_sheet(sheet_file):
    sheet_xml = z.read(sheet_file)
    sheet_root = ET.fromstring(sheet_xml)
    ns_s = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    rows = []
    for row in sheet_root.findall('.//ns:row', ns_s):
        row_data = {}
        for cell in row.findall('ns:c', ns_s):
            col_letter = ''.join(filter(str.isalpha, cell.attrib.get('r','')))
            cell_type = cell.attrib.get('t','')
            val_elem = cell.find('ns:v', ns_s)
            val = val_elem.text if val_elem is not None else None
            if cell_type == 's' and val:
                val = strings[int(val)]
            row_data[col_letter] = val
        rows.append(row_data)
    return rows

catalog_rows = parse_sheet('xl/worksheets/sheet2.xml')
# Skip header
catalog_data = []
for row in catalog_rows[1:]:
    if 'A' not in row or not row['A']: continue
    catalog_data.append({
        'complianceId': row.get('A', ''),
        'name': row.get('B', ''),
        'category': row.get('C', ''),
        'authority': row.get('D', ''),
        'frequency': row.get('E', ''),
        'dueRule': row.get('F', ''),
        'appliesTo': row.get('G', ''),
        'requiredDocuments': [x.strip() for x in row.get('H', '').split(',')] if row.get('H') else [],
        'severity': row.get('I', ''),
        'penaltyForNonCompliance': row.get('J', ''),
        'notes': row.get('K', '')
    })

rules_rows = parse_sheet('xl/worksheets/sheet3.xml')
rules_data = []
for row in rules_rows[1:]:
    if 'A' not in row or not row['A']: continue
    rules_data.append({
        'ruleId': row.get('A', ''),
        'complianceId': row.get('B', ''),
        'conditionField': row.get('C', ''),
        'operator': row.get('D', ''),
        'value': row.get('E', ''),
        'logicNote': row.get('F', '')
    })

checks_rows = parse_sheet('xl/worksheets/sheet5.xml')
checks_data = []
for row in checks_rows[1:]:
    if 'A' not in row or not row['A']: continue
    checks_data.append({
        'checkId': row.get('A', ''),
        'checkName': row.get('B', ''),
        'rule': row.get('C', ''),
        'triggerData': [x.strip() for x in row.get('D', '').split(',')] if row.get('D') else [],
        'severityIfFail': row.get('E', ''),
        'userMessage': row.get('F', '')
    })

docs_rows = parse_sheet('xl/worksheets/sheet7.xml')
docs_data = []
for row in docs_rows[1:]:
    if 'A' not in row or not row['A']: continue
    docs_data.append({
        'docTypeId': row.get('A', ''),
        'docType': row.get('B', ''),
        'category': row.get('C', ''),
        'linkedComplianceExamples': [x.strip() for x in row.get('D', '').split(',')] if row.get('D') else [],
        'retentionYears': int(row.get('E', '8')) if str(row.get('E')).isdigit() else 8
    })

# Mapping categories properly
cat_map = {
    'Statutory': 'CAT-STA',
    'ROC': 'CAT-ROC',
    'Tax': 'CAT-TAX',
    'Audit': 'CAT-AUD',
    'Governance': 'CAT-GOV',
    'Labour': 'CAT-LAB',
    'License': 'CAT-LIC',
    'Scheme': 'CAT-SCH',
    'Internal': 'CAT-GOV',
    'Operational': 'CAT-GOV'
}

for item in catalog_data:
    item['category'] = cat_map.get(item['category'], 'CAT-STA')

# Output to JS files
import textwrap

with open('src/data/complianceCatalog.ts', 'w') as f:
    f.write("import { ComplianceCategoryId } from './categories';\n")
    f.write("import { ComplianceFrequency, ComplianceSeverity } from './mock/compliance';\n\n")
    f.write("export interface ComplianceCatalogItem {\n")
    f.write("  complianceId: string;\n")
    f.write("  name: string;\n")
    f.write("  category: ComplianceCategoryId;\n")
    f.write("  authority: string;\n")
    f.write("  frequency: ComplianceFrequency | string;\n")
    f.write("  dueRule: string;\n")
    f.write("  appliesTo: string;\n")
    f.write("  requiredDocuments: string[];\n")
    f.write("  severity: ComplianceSeverity | string;\n")
    f.write("  penaltyForNonCompliance: string;\n")
    f.write("  notes: string;\n")
    f.write("}\n\n")
    f.write("export const COMPLIANCE_CATALOG: ComplianceCatalogItem[] = ")
    f.write(json.dumps(catalog_data, indent=2))
    f.write(";\n")

with open('src/data/applicabilityRules.ts', 'w') as f:
    f.write("export interface ApplicabilityRule {\n")
    f.write("  ruleId: string;\n")
    f.write("  complianceId: string;\n")
    f.write("  conditionField: string;\n")
    f.write("  operator: '=' | '>' | '>=' | 'in' | 'exists' | string;\n")
    f.write("  value: string;\n")
    f.write("  logicNote: string;\n")
    f.write("}\n\n")
    f.write("export const APPLICABILITY_RULES: ApplicabilityRule[] = ")
    f.write(json.dumps(rules_data, indent=2))
    f.write(";\n")

with open('src/data/auditChecks.ts', 'w') as f:
    f.write("import { ComplianceSeverity } from './mock/compliance';\n\n")
    f.write("export interface AuditCheckRule {\n")
    f.write("  checkId: string;\n")
    f.write("  checkName: string;\n")
    f.write("  rule: string;\n")
    f.write("  triggerData: string[];\n")
    f.write("  severityIfFail: ComplianceSeverity | string;\n")
    f.write("  userMessage: string;\n")
    f.write("}\n\n")
    f.write("export const AUDIT_CHECK_RULES: AuditCheckRule[] = ")
    f.write(json.dumps(checks_data, indent=2))
    f.write(";\n")

with open('src/data/documentTypes.ts', 'w') as f:
    f.write("export interface DocumentTypeInfo {\n")
    f.write("  docTypeId: string;\n")
    f.write("  docType: string;\n")
    f.write("  category: string;\n")
    f.write("  linkedComplianceExamples: string[];\n")
    f.write("  retentionYears: number;\n")
    f.write("}\n\n")
    f.write("export const DOCUMENT_TYPES: DocumentTypeInfo[] = ")
    f.write(json.dumps(docs_data, indent=2))
    f.write(";\n")

