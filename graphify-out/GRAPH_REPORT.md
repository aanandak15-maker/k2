# Graph Report - k2  (2026-05-07)

## Corpus Check
- 166 files · ~186,436 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 343 nodes · 236 edges · 8 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `computeDueDate()` - 9 edges
2. `runApplicabilityEngine()` - 9 edges
3. `computeDueDate()` - 9 edges
4. `ERPComplianceBridge` - 7 edges
5. `useToast()` - 6 edges
6. `runApplicabilityEngine()` - 5 edges
7. `onComplianceEvent()` - 5 edges
8. `calculateHealthScore()` - 5 edges
9. `exportToCsv()` - 4 edges
10. `ActivityStream` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ModeratorAdvisoryPush()` --calls--> `useToast()`  [INFERRED]
  src/components/moderator/ModeratorAdvisoryPush.tsx → src/hooks/useToast.tsx
- `ModeratorIssueFlagging()` --calls--> `useToast()`  [INFERRED]
  src/components/moderator/ModeratorIssueFlagging.tsx → src/hooks/useToast.tsx
- `onFPOOnboarding()` --calls--> `runApplicabilityEngine()`  [INFERRED]
  src/lib/engineTriggers.ts → src/lib/complianceEngine.ts
- `onProfileChange()` --calls--> `runApplicabilityEngine()`  [INFERRED]
  src/lib/engineTriggers.ts → src/lib/complianceEngine.ts
- `runApplicabilityEngine()` --calls--> `generateMockTasks()`  [INFERRED]
  src/lib/complianceEngine.ts → src/data/mock/complianceCalendar.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (17): generateMockTasks(), addDays(), computeDueDate(), computeFYEnd(), dedupe(), evaluateRule(), extractDays(), getApplicableCompliances() (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (3): ActivityStream, triggerMockEvent(), ERPComplianceBridge

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (7): AdminBillingContent(), AdminInventoryContent(), useAdminStore(), CEOAnalyticsContent(), ModeratorAdvisoryPush(), ModeratorIssueFlagging(), useToast()

### Community 3 - "Community 3"
Cohesion: 0.27
Nodes (12): addDays(), computeDueDate(), computeFYEnd(), dedupe(), evaluateRule(), extractDays(), normalizeFrequency(), parseFixedAnnualDate() (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (5): generateMCAFiling(), generateNabardMIS(), handleGenerate(), ReportFactory, generateTraceabilityReport()

### Community 5 - "Community 5"
Cohesion: 0.32
Nodes (5): generateAuditChecks(), assessCreditReadiness(), calculateCategoryScore(), calculateHealthScore(), getRiskBand()

### Community 6 - "Community 6"
Cohesion: 0.38
Nodes (4): handleExportAll(), handleExportCategory(), exportFullSystemData(), exportToCsv()

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (3): getSeverityColor(), getStatusDisplay(), ComplianceTaskDetail()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onComplianceEvent()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `runApplicabilityEngine()` (e.g. with `onFPOOnboarding()` and `onProfileChange()`) actually correct?**
  _`runApplicabilityEngine()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `useToast()` (e.g. with `ModeratorAdvisoryPush()` and `ModeratorIssueFlagging()`) actually correct?**
  _`useToast()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._