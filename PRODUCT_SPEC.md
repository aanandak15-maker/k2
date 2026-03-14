# <a id="_ifc3saiqd048"></a>__K2 FPO Management Platform — Complete Product Specification__

## <a id="_62jhs69fp3f4"></a>__Role\-by\-Role, Screen\-by\-Screen, Module\-by\-Module__

# <a id="_jztlqh2fraep"></a>__SECTION 1: PLATFORM ADMIN \(K2 Internal Team\)__

This role exists for K2's own operations team\. They manage the entire multi\-tenant ecosystem\. No FPO user ever sees this interface\.

## <a id="_3nhb1l326slr"></a>__1\.1 Platform Admin — Login & Access__

- Login via email \+ password \+ 2FA \(Google Authenticator or SMS OTP\)
- IP whitelisting — only K2 office IPs or VPN\-connected devices can access
- Session timeout after 30 minutes of inactivity
- Every login attempt \(success or failure\) is logged with IP, device, timestamp

## <a id="_12v0nxe23y82"></a>__1\.2 Platform Admin — Master Dashboard__

### <a id="_ysno9jrfj19c"></a>__Top Bar__

- K2 logo on left
- Search bar \(search any FPO by name, registration number, state, or CEO name\)
- Notification bell \(system alerts — server health, failed jobs, support tickets\)
- Admin profile dropdown \(logout, change password, activity log\)

### <a id="_a3gflhsbo0fg"></a>__KPI Strip \(5 Cards\)__

text

\[ Total FPOs Onboarded: 342 \]

\[ Total Farmers Across All FPOs: 41,200 \]

\[ Active FPOs This Month: 298 \]

\[ MIS Reports Generated This Quarter: 1,204 \]

\[ Support Tickets Open: 17 \]

Each card clickable — drills into filtered list view\.

### <a id="_j74jbll9u3dm"></a>__FPO Health Map__

- India map with dots for each FPO location
- Color coded: Green \(healthy — score 70\+\), Yellow \(needs attention — 40–69\), Red \(critical — below 40\)
- Click any dot → FPO summary card appears as overlay
- Filter map by: State, District, Score Range, Onboarding Date, Active/Inactive

### <a id="_3mjlmujxwahe"></a>__Recent Activity Feed__

- Last 50 actions across all FPOs \(new FPO created, CEO changed, subscription renewed, etc\.\)
- Filterable by action type
- Each entry shows: FPO Name → Action → Performed By → Timestamp

## <a id="_tzc88ctt9ihq"></a>__1\.3 Platform Admin — FPO Management__

### <a id="_pa3q5ztwlplp"></a>__FPO List View__

- Table with columns: FPO Name | Registration No | State | District | CEO Name | Farmers Count | Credit Score | Subscription Status | Onboarded Date | Actions
- Sortable by any column
- Filters: State, District, Score Range, Subscription Status \(Active/Expired/Trial\), Farmer Count Range
- Search within table
- Export full FPO list to CSV/Excel

### <a id="_v8biovda01g3"></a>__Create New FPO \(Onboarding Wizard — 4 Steps\)__

Step 1: FPO Identity

- FPO registered name \(as per MCA\)
- Registration number \(CIN\)
- Date of incorporation
- Registered address
- State, District, Block, Pin Code
- FPO category \(Crop\-based / Livestock / Fishery / Mixed\)
- Primary commodity focus

Step 2: CEO & Admin Setup

- CEO full name
- CEO mobile number \(becomes login credential\)
- CEO email \(optional\)
- CEO Aadhaar last 4 digits \(for verification\)
- First Admin name \+ mobile \(if different from CEO\)
- Set initial password or send OTP invite

Step 3: Configuration

- Default language \(Hindi / English / Marathi / Telugu / Tamil / Kannada / Gujarati / Bengali / Odia / Punjabi\)
- Season configuration \(Kharif start\-end months, Rabi start\-end months, Zaid if applicable\)
- Currency display \(always INR, but number format selection — lakhs vs millions\)
- Enable/disable modules: Share Capital, Banking Integration, Scheme Tracker, Plant Saathi AI, IVR Calling
- Set farmer limit based on subscription tier

Step 4: Document Upload

- Upload: Certificate of Incorporation, MoA, AoA, PAN Card, GST Certificate \(if applicable\)
- All documents stored in tenant\-isolated S3 bucket
- Verification status: Pending → Verified → Rejected \(with reason\)

On Submit:

- FPO tenant created in database
- Unique fpo\_id generated
- CEO receives SMS with login link \+ OTP
- Welcome email sent \(if email provided\)
- FPO appears in Platform Admin dashboard immediately

### <a id="_r846skcvkyw3"></a>__FPO Detail View \(Click any FPO from list\)__

Platform Admin sees a read\-only version of that FPO's CEO dashboard plus:

- Subscription details \(plan, start date, renewal date, payment history\)
- Storage usage \(documents, photos — against quota\)
- API usage \(requests per day — for rate limit monitoring\)
- User list \(all users in that FPO with roles\)
- Impersonate button — login as CEO/Admin of that FPO for support purposes \(every impersonation logged with reason field\)
- Suspend FPO toggle \(blocks all logins, shows "Account Suspended" screen to users\)
- Delete FPO \(soft delete — data retained 90 days, then permanently purged\)

## <a id="_l5vqhkpw9rx5"></a>__1\.4 Platform Admin — Subscription & Billing__

### <a id="_qhzmb4m20axf"></a>__Subscription Plans Table__

- Plan Name | Monthly Price | Annual Price | Max Farmers | Max Moderators | Modules Included | Storage Limit
- CRUD on plans \(but changing a plan doesn't affect existing subscribers until renewal\)

### <a id="_bvq6q51lfltc"></a>__FPO Subscription Management__

- Table: FPO Name | Current Plan | Start Date | Renewal Date | Payment Status | Amount Due
- Filter by: Plan Type, Payment Status \(Paid/Overdue/Grace Period\), Renewal Month
- Manual payment entry \(for bank transfers — reference number, date, amount\)
- Send payment reminder \(SMS \+ Email\)
- Auto\-downgrade rules: if payment overdue by 30 days, restrict to read\-only mode; 60 days, suspend

### <a id="_l2qfssd6eat2"></a>__Revenue Dashboard__

- Monthly recurring revenue \(MRR\) — line chart, last 12 months
- Total FPOs by plan tier — pie chart
- Churn rate — FPOs that downgraded or cancelled, monthly
- Average revenue per FPO — trend line
- Upcoming renewals this month — list with amounts

## <a id="_zcs1vz7iw8l1"></a>__1\.5 Platform Admin — Support & Tickets__

### <a id="_6nkgok898qm"></a>__Ticket Queue__

- Table: Ticket ID | FPO Name | Raised By \(Role\) | Subject | Priority \(Low/Medium/High/Critical\) | Status \(Open/In Progress/Resolved/Closed\) | Created Date | Last Updated
- Sort by priority, then by age
- Click ticket → full thread view with internal notes
- Assign to K2 team member
- SLA tracking: High priority must respond in 4 hours, Critical in 1 hour

### <a id="_6mhz3qnjjt3u"></a>__Knowledge Base Management__

- Create/edit help articles \(Markdown editor\)
- Categorize by module \(Farmer Management, Inventory, Payments, etc\.\)
- Articles visible to FPO users based on role
- Track article views — identify gaps

## <a id="_jx9b94uxgfir"></a>__1\.6 Platform Admin — System Monitoring__

### <a id="_hc05vb9z02t4"></a>__Server Health__

- API response time — average, P95, P99 — last 24 hours
- Database connection pool usage
- Redis memory usage
- Background job queue depth \(Bull Queue\)
- Failed job list with retry button

### <a id="_ykd606l3wwh"></a>__Tenant Usage Analytics__

- API calls per FPO per day — bar chart
- Heaviest FPOs by database size
- Concurrent user count — real\-time gauge
- Geographic distribution of API calls \(for CDN optimization\)

### <a id="_tsbq9w186fnt"></a>__Audit Log Viewer__

- Search across all FPOs or filter by specific FPO
- Filter by: Action Type \(Login/Data Edit/Role Change/Export/Delete\), User, Date Range
- Each entry: Timestamp | FPO | User | Role | Action | Entity \(Farmer/Order/Payment\) | Entity ID | Old Value | New Value | IP Address
- Export audit logs \(for compliance requests from NABARD/RBI\)

# <a id="_pwqu8elzxttz"></a>__SECTION 2: FPO CEO — Command Centre__

The CEO is the strategic head\. They see health, trends, risks, and opportunities\. They approve, they don't data\-enter\.

## <a id="_f563w5u32l8u"></a>__2\.1 CEO — Login Flow__

- Open web app \(or mobile app — responsive\)
- Enter mobile number → Receive OTP → Enter OTP → Land on dashboard
- First\-time login: language selection screen → persists in profile
- If CEO has multiple FPO associations \(rare but possible\): FPO selector screen after OTP
- Session persists for 7 days on trusted device, 24 hours otherwise

## <a id="_r31sglhkzo40"></a>__2\.2 CEO — Top Navigation Bar \(Persistent Across All Screens\)__

Left Section:

- FPO logo \(uploaded by Admin, fallback to K2 logo\)
- FPO name in full
- Season selector dropdown: Kharif 2025 | Rabi 2025–26 | Zaid 2025 | All Seasons
	- Changing season re\-filters ALL data across ALL modules instantly

Center Section:

- Navigation tabs: Dashboard | Farmers | Operations | Finance | Compliance | Reports

Right Section:

- Notification bell with unread count badge
	- Dropdown shows last 10 notifications
	- "View All" goes to full notification center
- FPO Credit Score: circular gauge, score out of 100
	- Tap → breakdown of score components \(governance 25%, financial health 25%, compliance 25%, activity 25%\)
- Language toggle: dropdown with all configured languages
- Profile icon: My Profile | Change Language | Logout

## <a id="_qny5dcvseed"></a>__2\.3 CEO — Main Dashboard \(Home Screen\)__

This is the first screen after login\. Everything is designed to answer: "What needs my attention right now?"

### <a id="_p3oa6u1rip8v"></a>__Row 1: KPI Cards \(5 cards, horizontal scroll on mobile\)__

Card 1: Farmer Strength

- Primary number: Active Farmers \(e\.g\., 847\)
- Secondary: Total Registered \(e\.g\., 1,200\)
- Micro\-trend: ↑ 23 new this season
- Status dot: Green if active > 70% of total, Yellow if 50–70%, Red if < 50%
- Tap → Farmer module

Card 2: Crop Coverage

- Primary: Total Area Under Cultivation \(e\.g\., 1,240 Ha\)
- Secondary: Breakdown by top 3 crops \(Wheat 520 Ha, Mustard 380 Ha, Potato 340 Ha\)
- Micro\-trend: ↑ 8% vs last season
- Tap → Crop coverage detail

Card 3: Input Operations

- Primary: Orders Pending Fulfillment \(e\.g\., 34\)
- Secondary: Orders Completed This Season \(e\.g\., 186\)
- Alert flag: if pending > 20% of total, show amber warning
- Tap → Input order module

Card 4: Cash Position

- Primary: Current Bank Balance \(e\.g\., ₹4\.2L\)
- Secondary: Net Cash Flow This Month \(\+₹1\.8L or −₹0\.5L\)
- Color: Green if positive, Red if negative
- Tap → Finance module

Card 5: Revenue Progress

- Primary: Revenue This Season \(e\.g\., ₹18L\)
- Secondary: Target \(e\.g\., ₹24L\) with progress bar
- Percentage: 75% achieved
- Tap → Sales/Revenue detail

### <a id="_biils3of7yug"></a>__Row 2: CEO Decision Feed \(The Co\-Pilot — CENTER of the page\)__

This is a vertical scrolling feed of actionable intelligence cards\. Each card has:

- Severity icon: 🔴 Critical | 🟡 Warning | 🟢 Opportunity | 🔵 Informational
- Title \(one line, plain language\)
- Detail \(2–3 lines explaining context\)
- Action buttons \(1–2 max\)
- Timestamp
- Source tag \(System / Plant Saathi AI / Moderator / Finance Module\)

Types of alerts that appear here:

Farmer Alerts:

- "23 farmers have not confirmed sowing — season delay risk"
	- Action: \[View List\] \[Assign to Moderator\]
- "14 new farmer applications pending approval"
	- Action: \[Review Now\]
- "Farmer Ramu Kaka reported crop damage — moderator flagged"
	- Action: \[View Report\] \[Call Farmer\]

Market Alerts \(Mandi Intelligence\):

- "Tomato price in Agra mandi up 18% this week — consider holding harvest"
	- Action: \[View Price Trend\] \[Notify Farmers\]
- "Wheat MSP announced: ₹2,275/qtl — calculate FPO procurement margin"
	- Action: \[View Calculation\]
- "Buyer Agri Corp placed new bid: ₹2,400/qtl for 200 qtl wheat"
	- Action: \[Accept\] \[Counter\] \[Reject\]

Financial Alerts:

- "₹82,000 in input dues overdue from 11 farmers — collections at risk"
	- Action: \[View Defaulters\] \[Send SMS Reminder\]
- "Supplier payment of ₹1\.5L due in 3 days — ensure sufficient balance"
	- Action: \[View Payment Schedule\]
- "Grant disbursement of ₹3L received from SFAC — allocate to budget"
	- Action: \[View Transaction\]

Compliance Alerts:

- "AGM must be conducted within 42 days — prepare agenda"
	- Action: \[Generate Agenda Template\] \[Set Date\]
- "NABARD MIS Q2 submission due in 12 days"
	- Action: \[Generate Report\]
- "3 farmer KYC documents expired — update before audit"
	- Action: \[View List\]

Operational Alerts:

- "Warehouse stock of DAP fertilizer below threshold — 12 bags remaining"
	- Action: \[Raise Purchase Order\]
- "Weather alert: Heavy rain expected in 48 hours — advise farmers"
	- Action: \[Send Advisory\] \[View Affected Farmers\]
- "Moderator Suresh has not logged activity in 5 days"
	- Action: \[View Moderator Profile\] \[Send Reminder\]

Feed is sorted by:

1. Critical first, then warning, then opportunity, then informational
2. Within same severity: newest first
3. Dismissed items move to "Dismissed" tab \(CEO can review later\)
4. Maximum 30 items in active feed — older items archive automatically

### <a id="_vk5ffy6bpxwo"></a>__Row 3: Farmer Overview Panel__

Left Half: Farmer Pipeline Summary

Horizontal funnel visualization:

text

Registered \(1,200\) → KYC Complete \(1,050\) → Active This Season \(847\) → Transacting \(623\)

Each stage shows count and percentage conversion\.  
Drop\-off numbers highlighted in red\.

Right Half: Farmer Distribution

Two mini\-charts side by side:

1. By Cluster — horizontal bar chart showing farmer count per cluster \(moderator territory\)
2. By Crop — donut chart showing farmer distribution by primary crop

### <a id="_zcx4n2c73yt3"></a>__Row 4: Operations Snapshot__

Left: Input Supply Pipeline

Visual pipeline \(horizontal flow\):

text

Demand Collected → PO Raised → Supplier Confirmed → In Transit → At Warehouse → Distributed to Farmers

Each stage shows count of active orders\.  
Click any stage → filtered list of orders in that stage\.

Right: Output/Sales Pipeline

Visual pipeline:

text

Produce Committed → Quality Checked → Buyer Matched → Price Locked → Dispatched → Payment Received

Same interaction — click stage → detail list\.

### <a id="_epe7klki1317"></a>__Row 5: Financial Health Strip__

Cash Flow Timeline \(Horizontal Bar Chart — Week by Week\)

- X\-axis: Weeks \(current week highlighted\)
- Green bars \(up\): Expected inflows \(farmer payments, buyer advances, grant disbursements\)
- Red bars \(down\): Expected outflows \(supplier payments, staff salaries, operational costs\)
- Net line: running net position
- Hover any bar → breakdown tooltip

Three Financial Stat Cards Below:

text

Receivables: ₹8\.4L          Payables: ₹5\.1L          Net Working Capital: ₹3\.3L

\(from buyers \+ farmers\)      \(to suppliers \+ staff\)     \(receivables \- payables\)

Overdue: ₹1\.2L 🔴           Overdue: ₹0\.4L 🟡         Trend: ↑ 12% vs last month 🟢

### <a id="_mdhmzzh2tkso"></a>__Row 6: Compliance & Scheme Tracker \(Right Sidebar on Desktop, Below on Mobile\)__

Compliance Checklist:  
Each item is a card with status:

text

☑️ Annual General Meeting — Completed \(Aug 12, 2024\)

⏳ NABARD MIS Q2 — Due in 12 days \[Generate Now\]

☑️ ROC Annual Filing — Completed ✅

⏳ Income Tax Return — Due in 45 days

⏳ GST Return \(if applicable\) — Due in 8 days \[View Data\]

☑️ Board Meeting Minutes — Last uploaded Sep 2024

⏳ Statutory Audit — Auditor assigned, due Mar 2025

Scheme Tracker:

text

PM\-KISAN:        312 eligible → 198 linked → 114 pending \[Push Remaining\]

Soil Health Card: 847 farmers → 340 tested → 507 pending \[Schedule Camp\]

Crop Insurance:   Kharif enrolled: 423 → Claims filed: 12 → Settled: 8

SFAC Grant:       Applied ₹5L → Sanctioned ₹3L → Disbursed ₹3L ✅

NABARD Fund:      Eligible → Application not started \[Start Now\]

State Subsidy:    ₹2L approved → Disbursement pending

## <a id="_ln4zahe1sjtd"></a>__2\.4 CEO — Farmer Module \(Detailed View\)__

CEO sees farmers in read\-only mode \(cannot edit profiles — that's Admin's job\)\. CEO focuses on analysis and action\.

### <a id="_dcxz7esz0n4f"></a>__Farmer Table View__

Columns \(configurable — CEO can hide/show\):  
| Farmer Name | Father's Name | Village | Cluster | Moderator | Mobile | Land \(Ha\) | Primary Crop | Secondary Crop | Share Capital \(₹\) | Input Orders This Season | Total Dues \(₹\) | Last Payment Date | Last Moderator Visit | Status |

Status values:

- 🟢 Active: transacted within last 30 days
- 🟡 Dormant: registered but no transaction in 30\+ days
- 🔴 Inactive: no activity in 90\+ days
- 🆕 New: registered within last 15 days
- ⚠️ Flagged: moderator raised an issue

Filters \(left sidebar\):

- Status \(multi\-select\)
- Cluster/Village \(multi\-select\)
- Moderator \(dropdown\)
- Crop \(multi\-select\)
- Land range \(slider: 0–50 Ha\)
- Dues status: No Dues / Has Dues / Overdue
- Share capital: Paid / Partial / Unpaid
- Season: Current / Previous / All
- KYC status: Complete / Incomplete

Sort by: Any column, ascending/descending

Search: Real\-time search by name, mobile, village

Bulk Actions \(CEO\-level\):

- Export filtered list to Excel/CSV
- Send SMS to all filtered farmers
- Send WhatsApp broadcast to filtered farmers
- Flag for moderator follow\-up \(select multiple → assign task\)
- Generate NABARD\-format farmer list

### <a id="_hzwv1e5dh09i"></a>__Individual Farmer Profile \(Click any row\)__

Profile Header:

text

Photo \(if uploaded\)                    Farmer ID: FPO\-SKD\-0234

Raju Yadav                            Mobile: 98XXXXXX12

S/o Ramesh Yadav                      Village: Pilkhana

Age: 42 | Gender: Male                Cluster: Sikandrabad

Aadhaar: XXXX\-XXXX\-4523               Moderator: Suresh Kumar

Member Since: Jan 2022                Share Certificate: SC\-0234

Tab 1: Land & Crop Details

__Season__

__Crop__

__Variety__

__Area \(Ha\)__

__Survey No__

__Sowing Date__

__Expected Harvest__

__Actual Harvest__

__Yield \(Qtl\)__

__Status__

Rabi 2024\-25

Wheat

HD\-2967

1\.2

145/3

Nov 12

Mar 20

—

—

Growing

Kharif 2024

Paddy

Pusa\-44

1\.2

145/3

Jun 28

Oct 15

Oct 18

42

Completed

Rabi 2023\-24

Wheat

HD\-2967

1\.0

145/3

Nov 8

Mar 18

Mar 22

38

Completed

Yield trend mini\-chart below the table — shows yield per season as a line, with district average as comparison line\.

Tab 2: Financial Summary

text

Share Capital: ₹1,000 \(10 shares × ₹100\) — Fully Paid ✅

Total Input Purchases \(This Season\): ₹8,400

Total Payments Made: ₹6,600

Outstanding Dues: ₹1,800

Payment History \(last 5\):

  Jan 14 — ₹2,400 — Cash — Collected by Suresh

  Dec 28 — ₹2,200 — UPI — Self

  Dec 10 — ₹2,000 — Cash — Collected by Suresh

  \.\.\.

Produce Sold via FPO \(This Season\): 0 Qtl \(harvest pending\)

Produce Sold via FPO \(Last Season\): 42 Qtl @ ₹2,100/qtl = ₹88,200

FPO Margin Earned from This Farmer \(Last Season\): ₹4,200

Tab 3: Input Orders

__Order Date__

__Product__

__Quantity__

__Unit Price__

__Total__

__Delivery Status__

__Payment Status__

Nov 5

DAP Fertilizer

2 bags

₹1,350

₹2,700

Delivered ✅

Paid ✅

Nov 5

Wheat Seed HD\-2967

40 kg

₹65/kg

₹2,600

Delivered ✅

Partial \(₹1,800 pending\)

Dec 20

Propiconazole 25% EC

500 ml

₹320

₹320

Delivered ✅

Paid ✅

Tab 4: Advisory & Visit History

__Date__

__Type__

__Content__

__Sent By__

__Channel__

__Read/Acknowledged__

Jan 18

Disease Alert

Yellow rust warning — spray Propiconazole

Plant Saathi AI

WhatsApp \+ App

Read ✅

Jan 10

Irrigation

3rd irrigation due — 4cm water

System \(Crop Schedule\)

App

Read ✅

Dec 28

Field Visit

Crop healthy, no pest observed

Moderator Suresh

Visit Log

—

Tab 5: Scheme Linkage

text

PM\-KISAN: Linked ✅ — Last installment: ₹2,000 \(Oct 2024\)

Soil Health Card: Tested ✅ — Card No: SHC\-UP\-2024\-14523

Crop Insurance: Enrolled \(Kharif 2024\) — Premium: ₹680 — No claim filed

KCC \(Kisan Credit Card\): Applied — Status: Pending with bank

Tab 6: Documents

- Aadhaar copy \(thumbnail — last 4 visible, rest masked\)
- Land record / Khatauni
- Bank passbook front page
- Share certificate
- Photos from field visits

CEO Actions on Farmer Profile:

- Flag for moderator visit
- Add note \(visible to Admin and Moderator\)
- Send direct SMS
- Generate farmer report card \(PDF — for bank/NABARD/scheme applications\)

## <a id="_8m6cgnqfx4wo"></a>__2\.5 CEO — Operations Module__

### <a id="_6equvs5tr7zi"></a>__2\.5\.1 Input Procurement Dashboard__

Summary Cards:

text

\[ Total Demand Collected: ₹24\.8L \]  \[ POs Raised: ₹22\.1L \]

\[ Received at Warehouse: ₹18\.5L \]   \[ Distributed to Farmers: ₹16\.2L \]

\[ Pending Distribution: ₹2\.3L \]

Procurement Pipeline Table:

__PO Number__

__Supplier__

__Product__

__Qty Ordered__

__Qty Received__

__Qty Distributed__

__Remaining__

__PO Value \(₹\)__

__Status__

__Expected Delivery__

PO\-2024\-089

Iffco

DAP

500 bags

500

480

20

₹6,75,000

Active

—

PO\-2024\-092

UPL

Propiconazole

200 L

200

145

55

₹64,000

Active

—

PO\-2024\-095

National Seeds

HD\-2967 Wheat

2000 kg

0

0

2000

₹1,30,000

In Transit

Jan 25

CEO sees but does not create POs — that's Admin\. CEO can:

- Approve high\-value POs \(threshold configurable: e\.g\., POs above ₹50,000 need CEO approval\)
- View margin analysis: FPO buy price vs farmer sell price per product
- Flag a PO for review if pricing seems off

Margin Analysis Mini\-Table:

__Product__

__FPO Buy Price__

__Farmer Sell Price__

__Margin \(₹\)__

__Margin \(%\)__

DAP

₹1,200/bag

₹1,350/bag

₹150

12\.5%

Propiconazole

₹280/L

₹320/L

₹40

14\.3%

### <a id="_tmnimvvw14c1"></a>__2\.5\.2 Output / Sales Dashboard__

Produce Aggregation View:

__Crop__

__Variety__

__Total Expected \(Qtl\)__

__Committed to Buyers \(Qtl\)__

__Available for Spot Sale \(Qtl\)__

__Average Locked Price \(₹/Qtl\)__

Wheat

HD\-2967

4,200

3,000

1,200

₹2,350

Mustard

Pusa Bold

1,800

1,200

600

₹5,100

Buyer Contracts Table:

__Buyer Name__

__Crop__

__Qty \(Qtl\)__

__Price \(₹/Qtl\)__

__Delivery Window__

__Advance Received \(₹\)__

__Status__

Agri Corp Ltd

Wheat

2,000

₹2,400

Mar 25–Apr 5

₹2,00,000

Confirmed

Local Mandi Trader

Wheat

1,000

₹2,300

Mar 20–Mar 30

₹0

Tentative

Mandi Price Ticker \(Live — refreshed daily\):

text

Wheat \(Agra Mandi\): ₹2,280 ↑3\.2%    Mustard \(Bharatpur\): ₹5,050 ↓1\.1%

Potato \(Agra\): ₹1,420 ↑8\.5%          Tomato \(Agra\): ₹3,200 ↑18\.2% 🔥

Source: Agmarknet / eNAM API integration\.

Price Comparison Chart:

- Line chart: Last 30 days mandi price vs FPO locked price
- Shows whether FPO deal is above or below market
- Green zone: FPO price > mandi price \(good deal\)
- Red zone: FPO price < mandi price \(review needed\)

### <a id="_tcwwi0ev45sr"></a>__2\.5\.3 Warehouse / Inventory View \(CEO — Read Only\)__

Stock Summary Table:

__Product__

__Category__

__Opening Stock__

__Received__

__Distributed__

__Wastage__

__Current Balance__

__Reorder Level__

__Status__

DAP Fertilizer

Fertilizer

0

500 bags

480

2

18

50

🔴 Below Reorder

Propiconazole

Pesticide

0

200 L

145

0

55

30

🟢 OK

Wheat Seed

Seed

0

2000 kg

1800

15

185

200

🟡 Near Reorder

CEO Action: Can see stock but cannot make entries\. Can approve reorder requests from Admin\.

Expiry Alert Panel:

text

⚠️ Propiconazole Batch B\-2024\-03: Expires Feb 28, 2025 — 55L remaining

⚠️ Mancozeb Batch B\-2024\-05: Expires Mar 15, 2025 — 20 kg remaining

## <a id="_uf06jqowwnx"></a>__2\.6 CEO — Finance Module__

CEO sees financial health\. Not double\-entry accounting — that's Admin \+ CA territory\.

### <a id="_lwa8z23yr6l"></a>__2\.6\.1 Financial Overview__

Four Quadrant Layout:

Quadrant 1: Revenue & Income \(Top Left\)

text

Revenue Sources \(This Season\):

  Input Sales to Farmers:    ₹16,20,000

  Produce Sales Commission:  ₹1,84,000

  Service Charges:           ₹42,000

  Grant/Subsidy Received:    ₹3,00,000

  Interest Income:           ₹8,200

  ─────────────────────────────────

  Total Income:              ₹21,54,200

Bar chart: Revenue by source, with comparison to last season\.

Quadrant 2: Expenses \(Top Right\)

text

Expense Categories \(This Season\):

  Input Procurement Cost:    ₹14,10,000

  Staff Salaries:            ₹1,80,000

  Transportation/Logistics:  ₹65,000

  Rent & Utilities:          ₹36,000

  Administrative:            ₹28,000

  ─────────────────────────────────

  Total Expenses:            ₹17,19,000

Donut chart: Expense breakdown by category\.

Quadrant 3: Profitability \(Bottom Left\)

text

Gross Margin:    ₹4,35,200  \(20\.2%\)

Operating Margin: ₹2,35,200  \(10\.9%\)

Net Surplus:      ₹1,85,200  \(8\.6%\)

Trend line: net surplus by season, last 4 seasons\.

Quadrant 4: Balance Summary \(Bottom Right\)

text

Bank Balance:      ₹4,21,000

Cash in Hand:      ₹18,500

Total Receivables: ₹8,42,000

Total Payables:    ₹5,12,000

Net Position:      ₹7,69,500

### <a id="_155no2o7lgqi"></a>__2\.6\.2 Receivables Breakdown__

From Farmers \(Input Dues\):

__Age Bucket__

__Count of Farmers__

__Total Amount \(₹\)__

__% of Total__

0–15 days

34

₹1,82,000

21\.6%

16–30 days

18

₹2,14,000

25\.4%

31–60 days

8

₹1,86,000

22\.1%

60\+ days

5

₹2,60,000

30\.9%

Total

65

₹8,42,000

100%

Click any row → list of farmers in that bucket with individual amounts\.  
CEO can: Send bulk SMS reminder, Flag for moderator collection visit\.

From Buyers \(Produce Sales\):

__Buyer__

__Invoice Amount__

__Advance Received__

__Balance Due__

__Due Date__

__Status__

Agri Corp

₹4,80,000

₹2,00,000

₹2,80,000

Apr 10

On Track

Mandi Trader

₹2,30,000

₹0

₹2,30,000

Mar 30

At Risk

### <a id="_9x8ydpfxm5r3"></a>__2\.6\.3 Payables Breakdown__

To Suppliers:

__Supplier__

__PO Value__

__Paid__

__Remaining__

__Due Date__

__Status__

Iffco

₹6,75,000

₹5,00,000

₹1,75,000

Feb 15

Due Soon

UPL

₹64,000

₹64,000

₹0

—

Paid ✅

To Staff:

__Month__

__Total Salary Due__

__Paid__

__Pending__

January 2025

₹1,80,000

₹1,80,000

₹0 ✅

February 2025

₹1,80,000

₹0

₹1,80,000 ⏳

### <a id="_eytajc90ku8"></a>__2\.6\.4 Cash Flow Forecast__

Weekly View \(Next 8 Weeks\):

__Week__

__Expected Inflows__

__Expected Outflows__

__Net__

__Cumulative Balance__

W1 \(Jan 20–26\)

₹1,20,000

₹85,000

\+₹35,000

₹4,56,000

W2 \(Jan 27–Feb 2\)

₹80,000

₹2,55,000

−₹1,75,000

₹2,81,000

W3 \.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

Visual: Stacked bar chart with inflow/outflow \+ line for cumulative balance\.  
Alert if any week shows balance dropping below ₹50,000 \(configurable threshold\)\.

### <a id="_34702kgx7fk5"></a>__2\.6\.5 Grant & Subsidy Tracker__

__Scheme__

__Applied Amount__

__Sanctioned__

__Disbursed__

__Pending__

__Utilization Certificate Due__

SFAC Equity Grant

₹5,00,000

₹3,00,000

₹3,00,000

₹0

Mar 31, 2025

NABARD PRODUCE Fund

₹10,00,000

₹10,00,000

₹7,00,000

₹3,00,000

Pending disbursement

State Govt Subsidy

₹2,00,000

₹2,00,000

₹0

₹2,00,000

Awaiting docs

## <a id="_9msta1lq40wj"></a>__2\.7 CEO — Analytics & Graphs Module__

This is where the CEO gets strategic depth\. All graphs are interactive — hover for data, click to drill\.

### <a id="_zff3gsrux8w5"></a>__2\.7\.1 Farmer Analytics__

Graph 1: Farmer Growth Over Time

- Line chart: Total farmers by month, last 24 months
- Second line: Active farmers \(transacted in month\)
- Gap between lines = dropout/dormancy
- Annotations for key events \(new moderator hired, scheme drive, etc\.\)

Graph 2: Farmer Activity Heatmap

- Y\-axis: Farmer names \(or clusters\)
- X\-axis: Weeks
- Color: Green \(active\), Yellow \(low activity\), Red \(no activity\), Gray \(not yet registered\)
- Quickly spot which clusters are underperforming

Graph 3: Farmer Retention Funnel

text

Season 1 Registration → Season 2 Return → Season 3 Return → Season 4\+ Loyal

1,200                    980 \(82%\)          847 \(71%\)          620 \(52%\)

Graph 4: Farmer Demographics

- Pie chart: Gender split
- Bar chart: Age distribution \(18–25, 26–35, 36–45, 46–55, 55\+\)
- Bar chart: Land holding distribution \(< 1 Ha, 1–2 Ha, 2–5 Ha, 5\+ Ha\)

### <a id="_ya36lk9i0e4g"></a>__2\.7\.2 Crop Analytics__

Graph 5: Crop\-wise Area & Yield

- Grouped bar chart: Area \(Ha\) and Yield \(Qtl/Ha\) by crop, by season
- Comparison with district average yield \(from government data — manually entered or API\)

Graph 6: Crop Calendar Heatmap

- All crops × months matrix
- Shows which months each crop is in which stage \(sowing / growing / harvesting\)
- Helps CEO plan procurement and sales cycles

Graph 7: Input Consumption Pattern

- Stacked bar chart: Fertilizer, Seeds, Pesticides — quantity and value by month
- Identifies peak demand periods for pre\-ordering

### <a id="_srv7wgpkb5kt"></a>__2\.7\.3 Financial Analytics__

Graph 8: Revenue Trend

- Line chart: Monthly revenue, last 12 months
- Stacked by source \(input sales, output commission, services, grants\)

Graph 9: Expense Trend

- Line chart: Monthly expenses, last 12 months
- Stacked by category

Graph 10: Profitability Trend

- Bar chart: Monthly surplus/deficit
- Cumulative surplus line overlaid

Graph 11: Working Capital Cycle

- Days Receivable \(average days to collect from farmers \+ buyers\)
- Days Payable \(average days FPO takes to pay suppliers\)
- Net Working Capital Days = Receivable Days − Payable Days
- Trend over last 6 months

### <a id="_nz6lulgyz04c"></a>__2\.7\.4 Operational Analytics__

Graph 12: Moderator Performance Scorecard

__Moderator__

__Farmers Assigned__

__Visits This Month__

__Advisory Sent__

__Payment Collected \(₹\)__

__Issues Flagged__

__Score__

Suresh

47

32

18

₹42,000

3

85/100

Priya

52

28

22

₹38,000

5

78/100

Rajesh

43

15

8

₹12,000

1

45/100 🔴

Bar chart: moderator scores compared\. Identify low performers\.

Graph 13: Order Fulfillment Rate

- Line chart: % of input orders fulfilled within promised timeline, by month
- Target line at 90%

Graph 14: Warehouse Turnover

- Days of inventory on hand per product category
- Flag slow\-moving stock

### <a id="_mosixi5lurt5"></a>__2\.7\.5 Credit Score Breakdown__

Graph 15: FPO Credit Score Components  
Spider/Radar chart with 4 axes:

1. Governance \(25 pts\): Board meetings held, AGM completed, minutes uploaded, women directors
2. Financial Health \(25 pts\): Revenue growth, profitability, dues collection rate, cash reserves
3. Compliance \(25 pts\): All filings current, audit completed, MIS submitted, scheme utilization
4. Operational Activity \(25 pts\): Farmer activity rate, moderator coverage, transaction volume, advisory frequency

Each axis scored 0–25\. Total = credit score out of 100\.  
Below the chart: specific recommendations to improve score\.

text

"Increase score by 8 points: Complete pending NABARD MIS \(\+ 3\), Conduct AGM \(\+ 3\), Upload audit report \(\+ 2\)"

## <a id="_wwttlcoxe6ih"></a>__2\.8 CEO — Reports Module__

CEO can generate but not customize report formats \(Admin can customize\)\.

### <a id="_ya6b925919ri"></a>__Pre\-built Reports:__

__Report Name__

__Frequency__

__Format__

__Audience__

__Content__

Farmer Master List

On\-demand

Excel/PDF

NABARD, Banks

All farmer details, KYC status, land, crop

Season Summary

End of season

PDF

Board, NABARD

Crop coverage, input consumption, yield, revenue

Financial Summary

Monthly/Quarterly

PDF/Excel

Board, CA, NABARD

Income, expense, receivables, payables

MIS Report \(NABARD format\)

Quarterly

PDF

NABARD

Pre\-formatted as per NABARD template

Share Capital Statement

Annual

PDF

ROC, Board

Shareholding pattern, transfers, dividends

Moderator Performance

Monthly

PDF

Internal

Visits, tasks, collections per moderator

Inventory Report

Monthly

PDF/Excel

Internal

Stock movement, wastage, valuation

Compliance Status

On\-demand

PDF

Board, Auditor

All compliance items with status

Farmer Report Card

Per farmer

PDF

Farmer, Bank

Individual farmer's history with FPO

Buyer/Supplier Statement

On\-demand

PDF

Buyer/Supplier

Transaction history, dues

Each report: Click "Generate" → Background job \(Bull Queue\) → Download link appears in Notifications when ready → Also accessible from Reports Archive\.

## <a id="_eceiyinl5lnm"></a>__2\.9 CEO — Notifications Center__

Full\-page view of all notifications\.

Tabs:

- All | Critical | Financial | Compliance | Operations | System

Each notification:

text

🔴 CRITICAL — Jan 18, 10:42 AM

₹82,000 overdue from 11 farmers — oldest due 45 days ago

\[View Farmers\] \[Dismiss\]

Status: Unread

Notification Settings \(CEO can configure\):

- Which categories to receive via: App only / App \+ SMS / App \+ SMS \+ WhatsApp
- Quiet hours \(no SMS/WhatsApp between 9 PM – 7 AM\)
- Daily digest option: receive one summary SMS at 8 AM instead of individual alerts

# <a id="_ygkh4lx7teet"></a>__SECTION 3: FPO ADMIN — Operations Controller__

Admin does everything the CEO sees PLUS has full edit/create/delete rights on operational data\. Admin is the person entering data, managing day\-to\-day operations\.

## <a id="_ql9dfoariytv"></a>__3\.1 Admin — Dashboard__

Same layout as CEO dashboard with these additions:

Additional KPI Cards:

text

\[ Pending Data Entry Tasks: 12 \]  \[ Unreconciled Payments: 8 \]

\[ Documents Expiring Soon: 3 \]    \[ Staff Attendance Today: 4/5 \]

Admin Quick Actions Bar \(Below KPIs\):

text

\[\+ Add Farmer\]  \[\+ Create PO\]  \[\+ Record Payment\]  \[\+ Upload Document\]  \[\+ Add Stock Entry\]

These are one\-click shortcuts to the most common Admin tasks\.

## <a id="_yelk2wi3yt6x"></a>__3\.2 Admin — Farmer Management \(Full CRUD\)__

Everything the CEO sees in farmer module PLUS:

### <a id="_quv779v2scnl"></a>__Add Farmer Form \(Multi\-Step\)__

Step 1: Personal Details

- Full Name \(required\)
- Father's/Husband's Name \(required\)
- Gender \(Male / Female / Other\)
- Date of Birth \(date picker\)
- Mobile Number \(required — unique check against existing farmers in this FPO\)
- Alternate Mobile
- Aadhaar Number \(full — stored encrypted, displayed as last 4 only\)
- Duplicate check triggers on mobile and Aadhaar — shows warning if match found
- Category \(SC / ST / OBC / General\)
- Education level \(Illiterate / Primary / Secondary / Graduate / Post\-Graduate\)
- Photo upload \(camera or gallery\)

Step 2: Address & Location

- Village / Hamlet
- Gram Panchayat
- Block
- District
- State
- Pin Code
- GPS coordinates \(auto\-capture from device or manual entry\)

Step 3: Land Details \(Repeatable — farmer may have multiple plots\)  
For each plot:

- Survey / Khasra Number
- Area \(Ha or Bigha — auto\-convert to Ha\)
- Ownership type \(Owned / Leased / Shared\)
- Irrigation type \(Irrigated / Rainfed / Mixed\)
- Soil type \(if known\)
- Land document upload \(Khatauni / Patta / Lease deed\)

Step 4: Banking Details

- Bank Name
- Branch
- Account Number \(stored encrypted\)
- IFSC Code \(auto\-fetch bank name via API\)
- Account holder name \(must match farmer name — flag if mismatch\)
- Passbook front page photo upload

Step 5: FPO Membership

- Membership number \(auto\-generated or manual\)
- Date of joining
- Share allotment: Number of shares × Face value = Total share capital
- Share certificate number \(auto\-generated or manual\)
- Nominee name \+ relationship

Step 6: Cluster Assignment

- Select cluster \(dropdown — pre\-configured by Admin\)
- Auto\-assigns to the moderator of that cluster
- Or manual moderator override

On Save:

- Farmer record created with fpo\_id tenant tag
- OTP sent to farmer's mobile with app download link
- Farmer can now log into Farmer App

### <a id="_4oahxautb8l9"></a>__Bulk Import__

- Download template CSV \(pre\-formatted with all required columns\)
- Upload filled CSV
- Validation engine runs:
	- Required field check
	- Mobile number format \(10 digits, Indian\)
	- Duplicate check \(mobile \+ Aadhaar\)
	- Aadhaar format check \(12 digits\)
	- Land area reasonability check \(flag if > 50 Ha — likely error\)
	- Village/District spell check against master database
- Validation report:
- text

Total Rows: 200

Valid: 182

- Errors: 18 \(download error report with row numbers and reasons\)
- Admin reviews errors, fixes in CSV, re\-uploads
- On confirm: 182 farmers created, 18 held back
- Progress bar for bulk import \(runs in background via Bull Queue\)

### <a id="_99f0r12qpdht"></a>__Edit Farmer__

- Same form as Add, pre\-filled
- Every edit logged: who changed what, old value, new value, timestamp
- Sensitive fields \(Aadhaar, bank account\) require re\-authentication \(Admin OTP\)

### <a id="_ppe1fkn5ucjf"></a>__Archive Farmer__

- Farmer is not deleted — soft archived
- Reason required: Left FPO / Deceased / Duplicate / Shifted Village / Other
- Archived farmers don't appear in active lists but their history is preserved
- Can be restored if needed \(with audit log\)

### <a id="_wv2dimfoi55o"></a>__Farmer Segmentation Tool__

Admin can create custom segments for targeted operations:

- Criteria builder: Crop = Wheat AND Land > 2 Ha AND Dues = 0 AND Active = Yes
- Save segment with name \(e\.g\., "Large Wheat Farmers — Good Standing"\)
- Use segment for: bulk advisory, scheme enrollment, buyer matching

## <a id="_tg8zzbik3i3c"></a>__3\.3 Admin — Share Capital Management__

### <a id="_tskxfm4k6fsq"></a>__Shareholding Table__

__Farmer Name__

__Membership No__

__Shares Held__

__Face Value__

__Total Capital \(₹\)__

__Paid \(₹\)__

__Unpaid \(₹\)__

__Certificate No__

__Date of Allotment__

__Status__

Raju Yadav

M\-0234

10

₹100

₹1,000

₹1,000

₹0

SC\-0234

Jan 15, 2022

Fully Paid

Seema Devi

M\-0312

10

₹100

₹1,000

₹500

₹500

SC\-0312

Mar 8, 2022

Partial

### <a id="_hsmbwss4sao"></a>__Actions:__

- Allot New Shares: Select farmer → Number of shares → Payment received \(Full/Partial\) → Generate certificate
- Share Certificate PDF: Auto\-generated with FPO name, farmer name, shares, certificate number, date, signatories\. Download or print\.
- Transfer Shares: From Farmer A → To Farmer B → Reason → Board resolution reference → Both certificates updated
- Refund Shares: On farmer exit → Calculate refund amount → Mark as refunded → Update register
- Dividend Calculation:
	- Input: Total distributable surplus, date range
	- Auto\-calculate: Per\-share dividend = surplus ÷ total shares outstanding
	- Generate dividend statement per farmer
	- Mark dividend as: Declared → Paid → show in farmer ledger

### <a id="_hjmmwkh218jh"></a>__Share Capital Summary__

text

Total Authorized Capital: ₹10,00,000 \(10,000 shares × ₹100\)

Total Issued Capital:     ₹1,20,000 \(1,200 shares\)

Total Paid\-Up Capital:    ₹1,08,500

Total Calls in Arrears:   ₹11,500 \(23 farmers\)

## <a id="_u9x7pazhs98d"></a>__3\.4 Admin — Input Order Management \(Full Lifecycle\)__

### <a id="_3njzmqf16f5k"></a>__Phase 1: Demand Collection__

Farmer Demand Aggregation Screen:  
Admin or Moderator collects crop\-wise input requirements from farmers\.

__Farmer__

__Crop__

__Product__

__Quantity Needed__

__Preferred Brand__

__Demand Date__

Raju Yadav

Wheat

DAP

2 bags

Iffco

Nov 1

Seema Devi

Wheat

DAP

3 bags

Any

Nov 1

\.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

Aggregated Demand Summary:

__Product__

__Total Quantity Demanded__

__Estimated Cost \(₹\)__

__Farmers Requesting__

DAP Fertilizer

500 bags

₹6,00,000

312

Wheat Seed HD\-2967

2,000 kg

₹1,30,000

280

Propiconazole

200 L

₹56,000

150

### <a id="_hw3i05l8ycxm"></a>__Phase 2: Purchase Order Creation__

Click "Create PO" → Select product → Select supplier \(from supplier master\) → Enter:

- Quantity
- Negotiated price per unit
- Total PO value \(auto\-calculated\)
- Payment terms \(Advance / Credit 15 days / Credit 30 days\)
- Expected delivery date
- Delivery location \(warehouse address\)
- Remarks / special instructions

PO Approval Workflow:

- PO below ₹50,000: Auto\-approved
- PO ₹50,000–₹2,00,000: Requires CEO approval \(CEO gets notification → Approve/Reject\)
- PO above ₹2,00,000: Requires CEO \+ Board resolution reference

PO Status Lifecycle:

text

Draft → Sent to Supplier → Supplier Confirmed → In Transit → Received at Warehouse → Closed

Each status change logged with timestamp and user\.

### <a id="_h42iihael3xy"></a>__Phase 3: Warehouse Receipt__

When goods arrive:

- Select PO → Enter received quantity
- Quality check: Grade \(A/B/C\), notes, photos
- Discrepancy flag: if received ≠ ordered, auto\-alert
- Generate Goods Receipt Note \(GRN\) — PDF, numbered, dated
- Update inventory automatically

### <a id="_jt6rrky66w5q"></a>__Phase 4: Distribution to Farmers__

Distribution Screen:

- Select product from warehouse stock
- Farmer list \(filtered by those who demanded this product\)
- Assign quantity to each farmer
- Bulk assign: proportional to demand or manual

__Farmer__

__Demanded__

__Allocated__

__Dispatched?__

__Received by Farmer?__

Raju Yadav

2 bags

2 bags

✅ Jan 5

✅ Jan 5

Seema Devi

3 bags

3 bags

✅ Jan 5

⏳ Pending

- On dispatch: Auto\-generate farmer invoice
- Moderator marks "Received by Farmer" in field

### <a id="_t7y5wpo8myle"></a>__Phase 5: Invoicing__

Auto\-Generated Farmer Invoice:

text

INVOICE: INV\-2024\-0892

Date: January 5, 2025

FPO: Sikandrabad FPC Ltd

Farmer: Raju Yadav \(M\-0234\)

| Item | Qty | Rate | Amount |

|\-\-\-\-\-\-|\-\-\-\-\-|\-\-\-\-\-\-|\-\-\-\-\-\-\-\-|

| DAP Fertilizer \(Iffco\) | 2 bags | ₹1,350 | ₹2,700 |

| Transportation charge | — | — | ₹50 |

| Total | | | ₹2,750 |

Payment Status: Pending

Due Date: January 20, 2025

Invoice PDF downloadable\. SMS with amount sent to farmer automatically\.

## <a id="_yrlc2yaq7r8c"></a>__3\.5 Admin — Supplier Management__

### <a id="_gou7sed32ot"></a>__Supplier Master__

__Supplier Name__

__Category__

__Contact Person__

__Mobile__

__Email__

__GST No__

__Location__

__Products__

__Credit Terms__

__Rating__

Iffco

Fertilizer

Rajiv Sharma

98XXXX1234

rajiv@iffco\.in

09AXXXX1234Z

Agra

DAP, MOP, Urea

30 days credit

⭐⭐⭐⭐

UPL Ltd

Pesticide

Amit Singh

97XXXX5678

amit@upl\.com

09BXXXX5678Z

Delhi

Propiconazole, Mancozeb

Advance

⭐⭐⭐

### <a id="_sne360voom3d"></a>__Supplier Performance Tracking__

- On\-time delivery rate \(%\)
- Quality acceptance rate \(%\)
- Pricing competitiveness \(vs market rate\)
- Credit terms reliability
- Auto\-calculated rating based on above metrics

### <a id="_skg0nszh721b"></a>__Supplier Ledger__

Per supplier: all POs, payments made, outstanding, credit available\.

## <a id="_jsck09mftbh8"></a>__3\.6 Admin — Buyer Management__

### <a id="_8ixrpcp4y4ud"></a>__Buyer Master__

__Buyer Name__

__Type__

__Contact__

__Mobile__

__Location__

__Products Interested__

__Price Range__

__Payment Terms__

__Reliability__

Agri Corp Ltd

Corporate

Vikram Jain

99XXXX4567

Delhi

Wheat, Rice

₹2,200–2,500

50% advance

⭐⭐⭐⭐⭐

Ramu Seth \(Mandi\)

Trader

Ramu

98XXXX8901

Agra Mandi

All grains

Market rate

No advance

⭐⭐⭐

### <a id="_qvts4o1u6jkt"></a>__Buyer Contracts__

- Contract creation form: Buyer, crop, quantity, price, delivery schedule, advance %, quality specs
- Contract status: Draft → Negotiating → Confirmed → In Execution → Completed → Closed
- Auto\-alert if committed quantity exceeds expected harvest

### <a id="_joeryffjlaoe"></a>__Buyer Ledger__

Per buyer: contracts, invoices raised, payments received, outstanding\.

## <a id="_r5vhl0az5vj5"></a>__3\.7 Admin — Inventory Module \(Full Access\)__

### <a id="_ohpvf1cjqluy"></a>__Warehouse Configuration__

- Warehouse name, address, capacity \(in MT or bags\)
- Warehouse manager \(from staff list\)
- Storage zones \(if multi\-section warehouse\)

### <a id="_6xszkg4fihgn"></a>__Live Stock Dashboard__

__Product__

__Category__

__Batch No__

__Opening__

__Received \(GRN\-linked\)__

__Distributed__

__Wastage/Damage__

__Adjustment__

__Closing__

__Unit__

__Expiry Date__

__Location__

DAP

Fertilizer

B\-2024\-01

0

500

480

2

0

18

Bags

N/A

Main Store

Propiconazole

Pesticide

B\-2024\-03

0

200

145

0

0

55

Litres

Feb 28, 2025

Chemical Room

### <a id="_xj3wa9757vb6"></a>__Stock Entry Types__

1. Inward \(from Supplier\): Auto\-created from GRN\. Manual entry also possible for non\-PO purchases\.
2. Outward \(to Farmer\): Auto\-created from distribution\. Manual entry for samples/demos\.
3. Wastage/Damage: Quantity, reason \(expired / damaged / rodent / theft\), photo evidence, authorized by
4. Adjustment: Physical count ≠ system count → Adjustment entry with reason \+ approval

### <a id="_qlivnr4brjsw"></a>__Inventory Valuation__

- Per product: Qty × Purchase Price = Value
- Total inventory value at any point
- FIFO method for cost tracking \(first\-in, first\-out\)

### <a id="_2lqt2d4665hv"></a>__Reorder Management__

- Set minimum stock level per product
- When current stock drops below minimum → Auto\-alert to Admin \+ CEO
- One\-click: "Create PO from Reorder Alert" — pre\-fills product, suggested quantity, last supplier

### <a id="_na70xf747ttw"></a>__Expiry Tracking__

- Calendar view showing products expiring in next 30 / 60 / 90 days
- Auto\-alert at 30 days before expiry
- Expired stock auto\-flagged — must be written off or disposed

### <a id="_1307f8xykrw2"></a>__Stock Movement Report__

- Select product \+ date range → Full movement history
- Useful for audit trail and NABARD inspections

## <a id="_sv96m7lauclo"></a>__3\.8 Admin — Billing & Payments Module__

### <a id="_4gl4l8ygq2yn"></a>__3\.8\.1 Farmer Ledger__

Master View:

__Farmer__

__Total Invoiced \(₹\)__

__Total Paid \(₹\)__

__Outstanding \(₹\)__

__Last Payment__

__Overdue Amount \(₹\)__

__Overdue Days__

Raju Yadav

₹8,400

₹6,600

₹1,800

Jan 14

₹1,800

12

Seema Devi

₹12,100

₹8,000

₹4,100

Dec 28

₹4,100

29

Click farmer → full ledger view:

__Date__

__Type__

__Description__

__Debit \(₹\)__

__Credit \(₹\)__

__Balance \(₹\)__

Nov 5

Invoice

DAP 2 bags \(INV\-0892\)

2,700

2,700

Nov 5

Invoice

Wheat Seed 40kg \(INV\-0893\)

2,600

5,300

Nov 20

Payment

Cash collected by Suresh

2,000

3,300

Dec 10

Payment

Cash collected by Suresh

2,000

1,300

Dec 20

Invoice

Propiconazole \(INV\-0912\)

320

1,620

Dec 28

Payment

UPI self\-payment

2,200

−580 \(credit\)

Jan 5

Invoice

Urea 1 bag \(INV\-0934\)

600

20

\.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

### <a id="_z8e587207dxh"></a>__3\.8\.2 Payment Recording__

Single Payment Entry:

- Select farmer
- Amount
- Date
- Mode: Cash / UPI / Bank Transfer / Cheque / Produce Adjustment
- Reference number \(UPI transaction ID / cheque number / bank ref\)
- Collected by \(dropdown: Admin / Moderator name\)
- Attach proof \(photo of receipt / screenshot\)
- Auto\-reconcile: system suggests matching invoices

Bulk Payment Entry:

- Upload bank statement \(CSV format\)
- System parses: Date, Amount, Reference, Narration
- Auto\-match to farmer based on UPI ID / phone number / name in narration
- Admin reviews matches:
- text

✅ ₹2,200 from RAJU YADAV \(UPI\) → Matched to Raju Yadav \(M\-0234\) — Confidence: 95%

⚠️ ₹1,500 from SEEMA \(UPI\) → Possible match: Seema Devi \(M\-0312\) — Confidence: 72% \[Confirm/Reject\]

- ❌ ₹3,000 from UNKNOWN — No match found \[Assign Manually\]
- Confirm all matches → payments recorded

### <a id="_g4mus7ri7wu4"></a>__3\.8\.3 Payment Receipt Generation__

- Auto\-generated on payment recording
- PDF with: FPO name, farmer name, amount, date, mode, reference, balance after payment
- Can be printed \(for cash payments\) or sent via WhatsApp

### <a id="_ye72q4vf4kpy"></a>__3\.8\.4 Overdue Management__

Overdue Dashboard:

text

Total Overdue: ₹4,82,000

Farmers with Overdue: 38

Average Overdue Days: 24

Age Bucket Breakdown:

  1–15 days:   ₹1,20,000 \(14 farmers\)

  16–30 days:  ₹1,80,000 \(12 farmers\)

  31–60 days:  ₹1,22,000 \(8 farmers\)

  60\+ days:    ₹60,000 \(4 farmers\)

Actions:

- Send individual SMS reminder \(template: "Dear \{name\}, your FPO input dues of ₹\{amount\} are overdue\. Please pay at earliest\. — \{FPO name\}"\)
- Send bulk SMS to all overdue farmers
- Send WhatsApp message \(with payment link if UPI enabled\)
- Create moderator task: "Collect ₹\{amount\} from \{farmer\}" — assigned to cluster moderator
- Generate overdue report \(for CEO / Board\)
- Flag farmer: if 90\+ days overdue → restrict further input supply until payment

### <a id="_a0xqdalbftzm"></a>__3\.8\.5 UPI Payment Link Generator__

- Select farmer → Enter amount → Generate UPI deep link
- Link sent via SMS/WhatsApp
- Farmer taps link → opens their UPI app → pays directly to FPO bank account
- Payment auto\-detected \(via webhook from payment gateway or manual bank statement reconciliation\)

## <a id="_a1v6yfou3xu7"></a>__3\.9 Admin — HR & Staff Module__

### <a id="_tusf98c4ajci"></a>__Staff List__

__Name__

__Designation__

__Role in System__

__Cluster Assigned__

__Mobile__

__Joining Date__

__Salary \(₹/month\)__

__Status__

Suresh Kumar

Field Coordinator

Moderator

Sikandrabad

98XXXX1111

Jan 2023

₹12,000

Active

Priya Singh

Field Coordinator

Moderator

Bulandshahr

97XXXX2222

Mar 2023

₹12,000

Active

Ramesh Gupta

Accountant

Admin

—

96XXXX3333

Jan 2022

₹18,000

Active

### <a id="_cmi0zasqz836"></a>__Add/Edit Staff__

- Name, designation, mobile, email, address
- Assign system role \(Moderator / Admin\)
- Assign cluster \(if Moderator\)
- Set salary
- Upload: ID proof, appointment letter, photo

### <a id="_ks1h8s351v7b"></a>__Attendance Tracking__

- Moderator check\-in: from mobile app, GPS\-stamped
- Admin can view:

__Date__

__Suresh__

__Priya__

__Rajesh__

__Ramesh__

Jan 18

✅ 8:42 AM

✅ 9:01 AM

✅ 8:55 AM

✅ 9:30 AM

Jan 19

✅ 8:38 AM

❌ Absent

✅ 9:10 AM

✅ 9:25 AM

-   
Monthly summary: Days Present / Absent / Leave / Half\-Day
- Leave management: Apply → Approve → Track balance \(Casual Leave / Sick Leave / Earned Leave\)

### <a id="_xfl38slp3je7"></a>__Task Management__

- Admin creates task: Title, Description, Assigned To, Deadline, Priority \(Low/Medium/High\)
- Task types: Farmer Visit, Data Collection, Payment Collection, Document Pickup, Meeting, Other
- Task status: Assigned → In Progress → Completed → Verified
- Overdue tasks highlighted in red
- Weekly task completion rate per staff member

### <a id="_5pwwr2d68fg4"></a>__Salary Processing__

- Monthly salary sheet: Staff Name, Base Salary, Incentive \(if any\), Deductions, Net Payable
- Mark as Paid \(with transaction reference\)
- Generate salary slip PDF
- Annual salary summary for tax purposes

### <a id="_8x10laua8gzi"></a>__Performance Dashboard__

Per moderator \(monthly\):

text

Suresh Kumar — January 2025

  Farmers Assigned: 47

  Farmers Visited: 38 \(81%\)

  Advisories Sent: 22

  Payment Collected: ₹42,000

  Issues Flagged: 3

  Tasks Completed on Time: 14/16 \(87\.5%\)

  Attendance: 24/26 days

  Overall Score: 85/100

Comparative bar chart: All moderators side by side\.

## <a id="_uc5k19x4r9oa"></a>__3\.10 Admin — Document Vault__

### <a id="_psqpuaa8fjh1"></a>__Document Categories & Expected Documents__

Statutory Documents:

- Certificate of Incorporation
- Memorandum of Association \(MoA\)
- Articles of Association \(AoA\)
- PAN Card
- GST Registration \(if applicable\)
- FSSAI License \(if food processing\)
- Seed License / Fertilizer License \(if applicable\)
- Shop & Establishment Registration

Governance Documents:

- Board Meeting Minutes \(each meeting as separate entry\)
- AGM Minutes
- Board Resolutions
- Director KYC documents
- Authorized Signatory documents

Financial Documents:

- Audited Balance Sheet \(annual\)
- Profit & Loss Statement \(annual\)
- Bank Statements \(monthly\)
- Loan Agreements
- Grant Sanction Letters
- Utilization Certificates

Operational Documents:

- Farmer registration forms \(if physical\)
- Land records \(aggregated\)
- Supplier contracts
- Buyer contracts
- Insurance policies

### <a id="_ulqy34buivh4"></a>__Document Entry__

- Upload file \(PDF/JPG/PNG — max 10MB\)
- Select category \(dropdown\)
- Document name
- Document date
- Expiry date \(if applicable — e\.g\., licenses\)
- Tags \(free text — for search\)
- Version: if re\-uploading, old version archived, new version becomes current
- Access control: CEO ✅ | Admin ✅ | Moderator ❌ | Farmer ❌

### <a id="_25q40icev35s"></a>__Expiry Management__

- 90\-day, 60\-day, 30\-day alerts for expiring documents
- Alert goes to CEO \+ Admin
- Document status: Valid / Expiring Soon / Expired
- Expired documents flagged in red — compliance risk

### <a id="_92c1swkcgh3"></a>__Search & Filter__

- Search by document name, tag, category
- Filter by: Category, Status \(Valid/Expired\), Date Range, Upload Date

### <a id="_1uuhf1olz5mj"></a>__Audit Trail__

- Every upload, download, view, delete logged
- Who accessed what document, when, from which IP

## <a id="_2ofq9tlhua2l"></a>__3\.11 Admin — Banking Integration__

### <a id="_ubmbfuekcri4"></a>__FPO Bank Accounts__

__Account Name__

__Bank__

__Branch__

__Account No__

__IFSC__

__Type \(Current/Savings\)__

__Balance \(Manual Update\)__

FPO Operating Account

SBI

Sikandrabad

12345XXXXX

SBIN0001234

Current

₹4,21,000

FPO Grant Account

PNB

Bulandshahr

67890XXXXX

PUNB0005678

Savings

₹3,00,000

### <a id="_j34d973or1tx"></a>__Transaction Entry__

- Date, Amount, Type \(Credit/Debit\), Description, Reference, Category
- Category: Farmer Payment / Supplier Payment / Salary / Grant Receipt / Buyer Receipt / Interest / Bank Charges / Other
- Link to: Invoice / PO / Salary record \(if applicable\)

### <a id="_1jyjfqjb10pm"></a>__Reconciliation__

- Upload bank statement CSV
- System shows: System transactions vs Bank transactions
- Match: Auto\-matched \(by amount \+ date \+ reference\)
- Unmatched: Admin manually matches or creates new entries
- Reconciliation summary:
- text

Bank Balance \(per statement\): ₹4,21,000

System Balance: ₹4,18,500

Difference: ₹2,500

Unmatched Bank Credits: ₹2,500 \(1 transaction\)

- Unmatched System Entries: ₹0
- Mark as "Reconciled for Month" — lock for that period

### <a id="_a8skxvpwi7q4"></a>__Bank Summary Export__

- Select account \+ date range
- Generate: CSV \(for CA\) or PDF \(for auditor\)
- Includes: Opening Balance, All Transactions, Closing Balance, Category\-wise Summary

## <a id="_8g238zaknatt"></a>__3\.12 Admin — Cluster & Geography Management__

### <a id="_b39uxdnwmlrw"></a>__Cluster Definition__

- Cluster Name
- Villages included \(multi\-select from village master\)
- Assigned Moderator
- Farmer count \(auto\-calculated\)

__Cluster__

__Villages__

__Moderator__

__Farmers__

__Active Farmers__

Sikandrabad

Pilkhana, Rampur, Hasanpur, Khanpur

Suresh Kumar

47

42

Bulandshahr East

Araniya, Dholana, Pahasu

Priya Singh

52

44

Gulaothi

Gulaothi, Shikarpur, Noorpur

Rajesh Pal

43

35

### <a id="_z6ihi8l2b574"></a>__Village Master__

- List of all villages in FPO operational area
- Each village: Name, Block, District, Pin Code, GPS coordinates \(center point\)
- Map visualization of villages with farmer density

### <a id="_44xyevne1yr1"></a>__Cluster Reassignment__

- Move village from one cluster to another
- Reassign moderator — all farmers in cluster auto\-assigned to new moderator
- Bulk reassignment tool: Select farmers → Move to different cluster

## <a id="_4811e5bbsez9"></a>__3\.13 Admin — Crop Management__

### <a id="_4j5x8ktf78cw"></a>__Crop Master__

__Crop__

__Season__

__Varieties Available__

__Avg Sowing Period__

__Avg Harvest Period__

__Avg Yield \(Qtl/Ha\)__

Wheat

Rabi

HD\-2967, PBW\-343, Lok\-1

Nov 1–25

Mar 15–Apr 10

42

Mustard

Rabi

Pusa Bold, RH\-749

Oct 15–Nov 10

Feb 20–Mar 15

18

Paddy

Kharif

Pusa\-44, PR\-126

Jun 15–Jul 15

Oct 15–Nov 15

55

### <a id="_atcbpuvxwgzd"></a>__Crop Schedule Template__

Per crop\-variety combination, define stage\-wise schedule:

__Stage__

__Activity__

__Days After Sowing__

__Duration \(days\)__

__Advisory Template__

1

Land Preparation

−15 to −1

15

Deep ploughing, soil treatment

2

Sowing

0

3

Seed rate 40kg/acre, row spacing 20cm

3

First Irrigation

21

1

Crown root initiation, 4cm water

4

First Urea Top Dressing

21

1

1/3 of total N dose

5

Second Irrigation

42

1

Tillering stage

6

Weed Management

30–35

5

Apply 2,4\-D or manual weeding

7

Third Irrigation

60

1

Jointing stage

8

Disease Watch

55–70

15

Check for yellow rust, spray if found

\.\.\.

\.\.\.

\.\.\.

\.\.\.

\.\.\.

12

Harvest

120–135

10

Golden ears, 12% moisture

This schedule auto\-populates the farmer's task calendar in the Farmer App and Moderator's task queue\.

### <a id="_tfuhbaria5po"></a>__Farmer\-Crop Assignment \(Season\-wise\)__

- Select season → Select farmer → Assign crop \+ variety \+ plot \+ expected sowing date
- This triggers the entire crop schedule for that farmer
- Bulk assignment: Select multiple farmers → Same crop → Different sowing dates allowed

## <a id="_fzcmby39ps6w"></a>__3\.14 Admin — Settings & Configuration__

### <a id="_8hq4pi76jc5u"></a>__FPO Profile__

- Edit: FPO name, address, logo, contact details
- Bank details, PAN, GST
- Board of Directors list \(Name, DIN, Contact, Date of Appointment\)

### <a id="_3o07466fzwg9"></a>__Season Configuration__

- Define seasons: Name, Start Month, End Month
- Current active season toggle
- Historical seasons \(locked — data cannot be edited\)

### <a id="_u14gc37soxsv"></a>__Notification Templates__

- SMS templates for: Payment reminder, Advisory alert, Scheme notification, Welcome message
- WhatsApp message templates \(must be pre\-approved by WhatsApp Business API\)
- IVR script templates \(for voice calls\)
- Variable substitution: \{farmer\_name\}, \{amount\}, \{crop\}, \{date\}, \{fpo\_name\}

### <a id="_zhfdoc1kohif"></a>__Approval Workflows__

- PO approval thresholds \(configurable amounts for auto\-approve / CEO\-approve / Board\-approve\)
- Payment release thresholds
- Farmer archival — requires CEO approval?

### <a id="_tqqej1luj2q"></a>__Master Data__

- Product Master: All products \(seeds, fertilizers, pesticides, equipment\) with HSN code, unit, GST rate
- Village Master: All villages in operational area
- Bank Master: Banks \+ branches \+ IFSC \(auto\-populated from RBI API\)
- Mandi Master: Nearby mandis for price tracking

# <a id="_ddfw5meakk2m"></a>__SECTION 4: MODERATOR — Mobile\-First Field App__

The Moderator \(Field Coordinator\) uses a React Native mobile app\. Every screen is designed for one\-hand operation on a 5\-inch Android phone over 2G connectivity\.

## <a id="_qfscpgvnxmwm"></a>__4\.1 Moderator — Login__

- Open app → Enter mobile number → OTP → Home screen
- App remembers login for 30 days
- Offline mode: If no network at login time, app uses cached session \(last 7 days of data available offline\)
- GPS permission requested on first login \(required — cannot proceed without it\)
- Language selection on first login

## <a id="_z2gfeqlry2yt"></a>__4\.2 Moderator — Home Screen__

text

┌──────────────────────────────┐

│  Good Morning, Suresh 🌾     │

│  Cluster: Sikandrabad        │

│  47 Farmers | Wheat Season   │

├──────────────────────────────┤

│  📋 TODAY'S TASKS            │

│  ┌──────────────────────┐   │

│  │ 6 Pending  │ 2 Overdue│   │

│  └──────────────────────┘   │

│  \[View Tasks →\]              │

├──────────────────────────────┤

│  👨‍🌾 MY FARMERS              │

│  ┌──────────────────────┐   │

│  │ 🟢 38  🟡 6  🔴 3    │   │

│  └──────────────────────┘   │

│  \[View All →\]                │

├──────────────────────────────┤

│  💰 COLLECTIONS TODAY        │

│  ┌──────────────────────┐   │

│  │ Collected: ₹4,500     │   │

│  │ Target: ₹8,000        │   │

│  └──────────────────────┘   │

│  \[Record Payment →\]         │

├──────────────────────────────┤

│  📢 ADVISORY DUE             │

│  ┌──────────────────────┐   │

│  │ 12 farmers need spray  │   │

│  │ advisory today         │   │

│  └──────────────────────┘   │

│  \[Send Advisory →\]          │

├──────────────────────────────┤

│  ⚠️ ALERTS                   │

│  • Weather: Rain expected    │

│    in 48 hrs                 │

│  • 3 farmers not reachable   │

│    for 7 days                │

│  \[View All →\]                │

└──────────────────────────────┘

Bottom Navigation:

\[🏠 Home\] \[👨‍🌾 Farmers\] \[📋 Tasks\] \[📊 More\]

## <a id="_a317mcb8kerh"></a>__4\.3 Moderator — My Farmers List__

### <a id="_q8j2hauefvq1"></a>__List View \(Default\)__

Each farmer is a card:

text

┌──────────────────────────────┐

│ 🟢 Raju Yadav                │

│    Wheat | 1\.2 Ha | Pilkhana │

│    Stage: 3rd Irrigation Due │

│    Last Visit: 3 days ago    │

│    Dues: ₹1,800              │

│    \[Visit\] \[Call\] \[Advisory\] │

└──────────────────────────────┘

┌──────────────────────────────┐

│ 🟡 Seema Devi                │

│    Wheat | 0\.8 Ha | Rampur   │

│    Stage: Spray Due \(Overdue\)│

│    Last Visit: 12 days ago ⚠️│

│    Dues: ₹4,100              │

│    \[Visit\] \[Call\] \[Advisory\] │

└──────────────────────────────┘

┌──────────────────────────────┐

│ 🔴 Mohan Singh               │

│    Wheat | 2\.0 Ha | Hasanpur │

│    Stage: Unknown — No update│

│    Last Visit: 28 days ago ⚠️│

│    Dues: ₹0                  │

│    \[Visit\] \[Call\] \[Advisory\] │

└──────────────────────────────┘

### <a id="_8rhlmxf4cdjt"></a>__Filters \(Slide\-up panel\)__

- Status: All / Needs Visit / Input Pending / Overdue Dues / Advisory Sent / Flagged
- Village: Multi\-select
- Crop: Multi\-select
- Sort by: Name / Last Visit \(oldest first\) / Dues \(highest first\)

### <a id="_lwiqwnv853hs"></a>__Search__

- Real\-time search by name or mobile number
- Works offline \(searches cached data\)

## <a id="_mf59teml47vl"></a>__4\.4 Moderator — Farmer Detail \(Tap any farmer card\)__

text

┌──────────────────────────────┐

│  📷 \[Photo\]                  │

│  Raju Yadav                  │

│  S/o Ramesh Yadav            │

│  📱 98XXXXXX12 \[Call\]        │

│  📍 Pilkhana, Sikandrabad   │

│  🌾 Wheat HD\-2967 | 1\.2 Ha  │

│  🆔 FPO\-SKD\-0234            │

├──────────────────────────────┤

│  CROP STATUS                 │

│  Sowing: Nov 12 ✅           │

│  1st Irrigation: Dec 3 ✅    │

│  2nd Irrigation: Dec 24 ✅   │

│  3rd Irrigation: Jan 14 ⏳   │

│  Spray Schedule: Jan 18 ⏳   │

│  Expected Harvest: Mar 20    │

├──────────────────────────────┤

│  FINANCIAL                   │

│  Inputs Taken: ₹8,400       │

│  Paid: ₹6,600               │

│  Outstanding: ₹1,800        │

│  \[Collect Payment\]           │

├──────────────────────────────┤

│  RECENT VISITS               │

│  Jan 15: Crop healthy,      │

│  irrigation done ✅           │

│  Jan 3: Checked for pests,   │

│  none found                  │

│  \[Log New Visit\]             │

├──────────────────────────────┤

│  ACTIONS                     │

│  \[📝 Log Visit\]              │

│  \[📢 Send Advisory\]          │

│  \[💰 Collect Payment\]        │

│  \[⚠️ Flag Issue\]             │

│  \[📞 Call Farmer\]            │

└──────────────────────────────┘

What Moderator CANNOT see:

- Farmer's Aadhaar number
- Farmer's bank account details
- Other farmers from other clusters
- FPO financial data
- Supplier/buyer information
- Any document vault items

## <a id="_y3doqa1ukrve"></a>__4\.5 Moderator — Task Queue__

### <a id="_a7lvtqzbfwj0"></a>__Today's Tasks__

Each task is a swipeable card:

text

┌──────────────────────────────┐

│ ⚠️ OVERDUE \(2 days\)          │

│ Visit Seema Devi             │

│ Spray verification           │

│ Rampur village               │

│                              │

│ \[Mark Done\] \[Reschedule\]     │

│             \[Escalate to CEO\]│

└──────────────────────────────┘

┌──────────────────────────────┐

│ 📋 DUE TODAY                 │

│ Collect ₹4,500 from          │

│ Raju Yadav                   │

│ Input dues — DAP fertilizer  │

│                              │

│ \[Collected\] \[Partial\]        │

│             \[Not Available\]  │

└──────────────────────────────┘

┌──────────────────────────────┐

│ 📋 DUE TODAY                 │

│ Send spray advisory to       │

│ 12 wheat farmers             │

│ Propiconazole for yellow rust│

│                              │

│ \[Send Now\] \[View Farmers\]    │

└──────────────────────────────┘

### <a id="_edljs2sssf7e"></a>__Task Sources \(auto\-generated\)__

1. Crop Schedule: "Visit farmer X — sowing verification due" \(from crop calendar\)
2. Payment Collection: "Collect ₹X from farmer Y" \(from overdue system\)
3. Advisory: "Send spray advisory to N farmers" \(from crop schedule or Plant Saathi AI\)
4. Admin/CEO Assigned: "Follow up with farmer Z — flagged by CEO"
5. System Alerts: "Farmer A not reachable for 7 days — check welfare"
6. Weather\-triggered: "Heavy rain advisory — inform all farmers"

### <a id="_gw507a8ekuin"></a>__Task Completion Flow__

Mark Done → Completion Form:

- Outcome: Completed / Partial / Not Possible
- Notes \(text — voice\-to\-text enabled\)
- Photo \(optional but encouraged\)
- GPS auto\-stamps on completion
- If payment collection: Enter amount collected → auto\-records payment

Reschedule:

- Select new date \(calendar picker\)
- Reason \(dropdown: Farmer not available / Weather / Personal / Other\)
- Rescheduled tasks flagged in yellow

Escalate:

- Select: Escalate to Admin / Escalate to CEO
- Add note explaining why
- Escalation creates a CEO Decision Feed alert

### <a id="_8vhel7u1uycc"></a>__Task Calendar View__

- Week view showing tasks per day
- Color coded by type: 🔵 Visit | 🟢 Advisory | 🟡 Collection | 🔴 Issue
- Swipe between weeks

## <a id="_uko1yw68c1qx"></a>__4\.6 Moderator — Visit Log__

### <a id="_sb7tsy7lycl"></a>__Log New Visit__

text

┌──────────────────────────────┐

│  LOG FIELD VISIT              │

│                              │

│  Select Farmer: \[Dropdown\]   │

│                              │

│  Visit Purpose:              │

│  ○ Crop Monitoring           │

│  ○ Input Delivery            │

│  ○ Payment Collection        │

│  ○ Advisory Delivery         │

│  ○ Issue Investigation       │

│  ○ General Check\-in          │

│                              │

│  Crop Stage Observed:        │

│  \[Dropdown: Sowing/Tillering/│

│   Flowering/Grain Filling/   │

│   Maturity/Harvested\]        │

│                              │

│  Crop Health:                │

│  ○ Healthy 🟢                │

│  ○ Minor Issue 🟡            │

│  ○ Major Problem 🔴          │

│                              │

│  Notes:                      │

│  \[Text area — voice\-to\-text\] │

│  🎤 \[Tap to speak\]          │

│                              │

│  Photos:                     │

│  \[📷 Take Photo\] \(up to 3\)  │

│                              │

│  📍 GPS: Auto\-captured       │

│  🕐 Time: Auto\-captured      │

│                              │

│  \[Submit Visit Log\]          │

└──────────────────────────────┘

On Submit:

- Visit logged with farmer ID, GPS, timestamp, photos
- If crop health = Major Problem → auto\-escalation to CEO \+ Plant Saathi AI analysis triggered
- Visit count updates in moderator's performance dashboard
- Farmer's "Last Visit" date updates in all views

### <a id="_gmbjihdi0r8a"></a>__Visit History__

- List of all visits logged by this moderator
- Filter by: Farmer, Date Range, Purpose
- Each visit shows: Farmer name, date, purpose, notes, photos, GPS map pin

## <a id="_h5im557aqm2t"></a>__4\.7 Moderator — Advisory Push__

### <a id="_nd7fjnrboc33"></a>__Send Advisory__

text

┌──────────────────────────────┐

│  SEND ADVISORY               │

│                              │

│  Recipients:                 │

│  ○ Individual Farmer \[Select\]│

│  ○ All Farmers in My Cluster │

│  ○ Custom Selection \[Multi\]  │

│                              │

│  Advisory Type:              │

│  ○ Irrigation                │

│  ○ Fertilizer Application    │

│  ○ Pest/Disease Management   │

│  ○ Harvest Timing            │

│  ○ Weather Alert             │

│  ○ General                   │

│                              │

│  Message:                    │

│  \[Pre\-filled template based  │

│   on type — editable\]        │

│                              │

│  "Dear \{farmer\_name\}, spray  │

│   Propiconazole 25% EC at    │

│   1ml/L water on your wheat  │

│   crop\. Best time: early     │

│   morning\. Contact field     │

│   officer if needed\."        │

│                              │

│  Channel:                    │

│  ☑️ App Notification         │

│  ☑️ WhatsApp                 │

│  ☐ SMS                      │

│  ☐ IVR Voice Call           │

│                              │

│  Language: \[Hindi ▼\]         │

│                              │

│  \[Preview\] \[Send Now\]        │

└──────────────────────────────┘

Plant Saathi AI Integration:

- If moderator uploads a photo of diseased crop during visit → AI analyzes → suggests diagnosis \+ treatment
- Moderator can convert AI recommendation directly into advisory with one tap
- AI suggestion shows: Disease Name, Confidence %, Recommended Treatment, Dosage
- Moderator reviews and can edit before sending

### <a id="_9sl6p5o3h7t5"></a>__Advisory Log__

- All advisories sent by this moderator
- Shows: Date, Content, Recipients Count, Delivery Status \(Sent/Delivered/Read\), Channel

## <a id="_i914mg98559z"></a>__4\.8 Moderator — Issue Flagging__

### <a id="_exoncwnh0ruy"></a>__Flag an Issue__

text

┌──────────────────────────────┐

│  FLAG AN ISSUE                │

│                              │

│  Issue Type:                 │

│  ○ Disease/Pest Outbreak     │

│  ○ Weather Damage            │

│  ○ Input Quality Problem     │

│  ○ Farmer Grievance          │

│  ○ Payment Dispute           │

│  ○ Land/Water Issue          │

│  ○ Other                     │

│                              │

│  Affected Farmer\(s\):        │

│  \[Multi\-select from list\]    │

│                              │

│  Severity:                   │

│  ○ Low  ○ Medium  ○ High    │

│                              │

│  Description:                │

│  \[Text — voice\-to\-text\]      │

│                              │

│  Photos: \[📷\] \(up to 5\)     │

│                              │

│  Estimated Crop Loss \(%\):   │

│  \[Slider: 0–100%\]           │

│                              │

│  \[Submit Issue\]              │

└──────────────────────────────┘

On Submit:

- Issue created with unique ID
- Routed to: Admin \(always\) \+ CEO \(if severity = High\)
- If type = Disease/Pest → Plant Saathi AI auto\-analysis on photos
- Issue appears in CEO Decision Feed
- Status tracked: Open → Acknowledged → Action Taken → Resolved

## <a id="_42xiimotl8yc"></a>__4\.9 Moderator — Payment Collection__

### <a id="_rb7kosp22lyy"></a>__Collect Payment__

text

┌──────────────────────────────┐

│  COLLECT PAYMENT              │

│                              │

│  Farmer: \[Select ▼\]         │

│  Outstanding: ₹4,100        │

│                              │

│  Amount Collected: \[₹ \_\_\_\_\] │

│                              │

│  Mode:                       │

│  ○ Cash                      │

│  ○ UPI \(farmer pays now\)    │

│                              │

│  If Cash:                    │

│  Receipt will be generated   │

│  automatically               │

│                              │

│  If UPI:                     │

│  \[Generate Payment Link\]     │

│  → Link sent to farmer's    │

│    WhatsApp                  │

│                              │

│  \[Confirm Collection\]        │

└──────────────────────────────┘

On Confirm:

- Payment recorded in farmer's ledger
- Receipt auto\-generated \(PDF\)
- Receipt can be shown to farmer on screen or sent via WhatsApp
- Moderator's collection total for the day updates
- Admin dashboard reflects in real\-time \(when synced\)

## <a id="_tjuhdsixy5vv"></a>__4\.10 Moderator — Offline Mode Behavior__

Critical for rural areas with spotty connectivity\.

What works offline:

- View farmer list \(cached\)
- View farmer profiles \(cached\)
- Log visits \(queued for sync\)
- Record payments \(queued for sync\)
- View crop schedule \(cached\)
- View today's tasks \(cached\)
- Take photos \(stored locally\)

What requires network:

- Send advisory \(WhatsApp/SMS needs network\)
- Flag issue \(needs server to route\)
- View new tasks from Admin/CEO
- Sync visit logs and payments

Sync behavior:

- App continuously checks for network
- When network available: auto\-syncs all queued actions
- Sync status indicator: 🟢 Synced | 🟡 Syncing | 🔴 Offline \(X items pending\)
- Conflict resolution: if same farmer data edited by Admin while moderator was offline → moderator's field data takes priority for visit logs, Admin's data takes priority for profile edits

## <a id="_228l975wge5h"></a>__4\.11 Moderator — Attendance & Check\-in__

### <a id="_ro6972d5b2lq"></a>__Daily Check\-in__

- On app open each day \(first open after 6 AM\): "Mark Attendance" prompt
- Tap → GPS captured → Timestamp captured → Attendance marked
- If GPS is in unexpected location \(> 5 km from cluster center\): flagged for Admin review
- Check\-out optional \(end of day\)

# <a id="_748flux0t8d8"></a>__SECTION 5: FARMER APP — Maximum Simplicity__

The Farmer App is a separate, ultra\-lightweight React Native app\. Target: Works on ₹5,000 Android phones, 2G networks, farmers with minimal smartphone experience\.

## <a id="_64dwnv9lrl5i"></a>__5\.1 Farmer App — Design Principles__

1. One screen = one purpose\. No tabs within tabs\.
2. Large text\. Minimum 16sp font\. Hindi as default\.
3. Icons over text\. Every action has a recognizable icon\.
4. Voice support\. Key information can be heard \(text\-to\-speech\)\.
5. No typing required for core actions\. Everything is taps and selections\.
6. Color meanings: Green = good/done, Yellow = pending, Red = action needed\.
7. No jargon\. "आपका बकाया" not "Outstanding Receivables\."

## <a id="_1ft2cqlukttg"></a>__5\.2 Farmer App — First\-Time Experience__

### <a id="_lfij1o28wcyy"></a>__Screen 1: Language Selection__

text

┌──────────────────────────────┐

│                              │

│  🌾 K2 Kisan App             │

│                              │

│  अपनी भाषा चुनें             │

│  Choose your language        │

│                              │

│  ┌────────────────────┐     │

│  │   हिन्दी            │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │   English           │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │   मराठी             │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │   తెలుగు           │     │

│  └────────────────────┘     │

│  \.\.\. \(all configured\)       │

│                              │

└──────────────────────────────┘

### <a id="_xflunp8lar25"></a>__Screen 2: Mobile Number Entry__

text

┌──────────────────────────────┐

│                              │

│  अपना मोबाइल नंबर डालें       │

│  Enter your mobile number    │

│                              │

│  ┌────────────────────┐     │

│  │  📱 98\_\_\_\_\_\_\_\_      │     │

│  └────────────────────┘     │

│                              │

│  \[OTP भेजें / Send OTP\]     │

│                              │

│  \(Large numeric keypad\)      │

│                              │

└──────────────────────────────┘

### <a id="_nml1hx7pjpsv"></a>__Screen 3: OTP Entry__

text

┌──────────────────────────────┐

│                              │

│  OTP डालें                    │

│  98XXXXXX12 पर भेजा गया     │

│                              │

│  ┌──┐ ┌──┐ ┌──┐ ┌──┐       │

│  │  │ │  │ │  │ │  │       │

│  └──┘ └──┘ └──┘ └──┘       │

│                              │

│  Auto\-read from SMS ✅       │

│                              │

│  \[दोबारा भेजें / Resend\]    │

│  \(Timer: 30 sec\)             │

│                              │

└──────────────────────────────┘

### <a id="_skswwtf2q1m8"></a>__Screen 4: Welcome \(First Time Only\)__

text

┌──────────────────────────────┐

│                              │

│  🙏 नमस्कार, राजू भैया\!      │

│                              │

│  आप सिकंदराबाद FPC लिमिटेड   │

│  के सदस्य हैं।                │

│                              │

│  FPO ID: FPO\-SKD\-0234       │

│                              │

│  आपका फील्ड ऑफिसर:           │

│  सुरेश कुमार \(📞\)            │

│                              │

│  \[शुरू करें / Get Started\]   │

│                              │

└──────────────────────────────┘

## <a id="_r7pre4l3s7tt"></a>__5\.3 Farmer App — Home Screen \(Main Screen — Everything Here\)__

This is a single scrollable screen\. No navigation complexity\.

text

┌──────────────────────────────┐

│ 🌾 K2 Kisan                  │

│ नमस्कार, राजू भैया 🙏        │

│ गेहूं | 1\.2 हेक्टेयर          │

│ FPO: सिकंदराबाद FPC          │

├──────────────────────────────┤

│                              │

│  ╔══════════════════════════╗│

│  ║  📋 आज का काम             ║│

│  ║  TODAY'S TASK             ║│

│  ║                          ║│

│  ║  💧 तीसरी सिंचाई करें      ║│

│  ║     गेहूं — 4 सेमी पानी    ║│

│  ║                          ║│

│  ║  \[✅ हो गया / Done\]       ║│

│  ║  \[❌ नहीं हुआ / Not Done\] ║│

│  ╚══════════════════════════╝│

│                              │

│  If no task today:           │

│  ╔══════════════════════════╗│

│  ║  ✅ आज कोई काम नहीं       ║│

│  ║     अगला काम: 3 दिन बाद   ║│

│  ║     \(खरपतवार प्रबंधन\)     ║│

│  ╚══════════════════════════╝│

│                              │

├──────────────────────────────┤

│  💰 मेरा हिसाब               │

│     MY ACCOUNT               │

│  ┌────────────────────────┐ │

│  │ आखिरी भुगतान:           │ │

│  │ ₹2,200 — 28 दिसम्बर     │ │

│  │                        │ │

│  │ FPO से मिलना बाकी:      │ │

│  │ ₹3,200 \(फसल बिक्री\)    │ │

│  │                        │ │

│  │ FPO को देना बाकी:       │ │

│  │ ₹1,800 \(खाद/बीज\)       │ │

│  │                        │ │

│  │ \[पूरा हिसाब देखें →\]    │ │

│  └────────────────────────┘ │

│                              │

├──────────────────────────────┤

│  📦 मेरे ऑर्डर                │

│     MY ORDERS                │

│  ┌────────────────────────┐ │

│  │ DAP खाद — 2 बोरी       │ │

│  │ ✅ मिल गया               │ │

│  │                        │ │

│  │ फफूंदनाशक — 500 ml     │ │

│  │ 🕐 आने वाला है          │ │

│  │                        │ │

│  │ \[नया ऑर्डर →\]           │ │

│  └────────────────────────┘ │

│                              │

├──────────────────────────────┤

│  ⚠️ सलाह / ADVISORY         │

│  ┌────────────────────────┐ │

│  │ 🟡 पीला रतुआ चेतावनी    │ │

│  │   आपके क्षेत्र में पीला  │ │

│  │   रतुआ का खतरा है       │ │

│  │                        │ │

│  │   दवाई: Propiconazole   │ │

│  │   25% EC               │ │

│  │   मात्रा: 1ml/लीटर पानी │ │

│  │                        │ │

│  │   \[📞 फील्ड ऑफिसर को    │ │

│  │    कॉल करें\]             │ │

│  │                        │ │

│  │   🔊 \[सुनें / Listen\]   │ │

│  └────────────────────────┘ │

│                              │

├──────────────────────────────┤

│  🏛️ योजना / SCHEMES         │

│  ┌────────────────────────┐ │

│  │ PM\-KISAN:               │ │

│  │ ₹2,000 किस्त 28 फरवरी  │ │

│  │ तक आएगी                 │ │

│  │                        │ │

│  │ मृदा स्वास्थ्य कार्ड:   │ │

│  │ \[अभी आवेदन करें →\]      │ │

│  └────────────────────────┘ │

│                              │

├──────────────────────────────┤

│  🌦️ मौसम / WEATHER          │

│  ┌────────────────────────┐ │

│  │ आज: ☀️ 24°C             │ │

│  │ कल: 🌧️ बारिश की संभावना │ │

│  │ \(सिंचाई टालें\)          │ │

│  └────────────────────────┘ │

│                              │

├──────────────────────────────┤

│                              │

│  ┌─────────┐ ┌─────────┐   │

│  │ 🌱      │ │ 👨‍🌾      │   │

│  │ सामान   │ │ फील्ड   │   │

│  │ चाहिए   │ │ विजिट   │   │

│  └─────────┘ └─────────┘   │

│  ┌─────────┐ ┌─────────┐   │

│  │ ❗      │ │ 📞      │   │

│  │ समस्या  │ │ कॉल     │   │

│  │ बताएं   │ │ करें    │   │

│  └─────────┘ └─────────┘   │

│                              │

└──────────────────────────────┘

## <a id="_kceti6ly1rqd"></a>__5\.4 Farmer App — Full Account View \(Tap "पूरा हिसाब देखें"\)__

text

┌──────────────────────────────┐

│  ← वापस    💰 मेरा हिसाब     │

├──────────────────────────────┤

│                              │

│  कुल खरीदारी \(इस सीजन\):     │

│  ₹8,400                     │

│                              │

│  कुल भुगतान:                  │

│  ₹6,600                     │

│                              │

│  बाकी:                       │

│  ₹1,800                     │

│                              │

│  \[💳 अभी भुगतान करें / Pay\] │

│  \(Opens UPI payment link\)    │

│                              │

├──────────────────────────────┤

│  लेन\-देन का विवरण:           │

│                              │

│  5 नवम्बर — DAP खाद 2 बोरी  │

│  ₹2,700 \(खरीदा\)             │

│                              │

│  5 नवम्बर — गेहूं बीज 40 kg │

│  ₹2,600 \(खरीदा\)             │

│                              │

│  20 नवम्बर — भुगतान          │

│  ₹2,000 \(नकद\)               │

│                              │

│  10 दिसम्बर — भुगतान          │

│  ₹2,000 \(नकद\)               │

│                              │

│  20 दिसम्बर — फफूंदनाशक      │

│  ₹320 \(खरीदा\)               │

│                              │

│  28 दिसम्बर — भुगतान          │

│  ₹2,200 \(UPI\)               │

│                              │

│  5 जनवरी — यूरिया 1 बोरी     │

│  ₹600 \(खरीदा\)               │

│                              │

│  ─────────────────────       │

│  बाकी: ₹1,800               │

│                              │

└──────────────────────────────┘

Displayed in simple, chronological order\. No accounting jargon\.  
Green text for payments \(money farmer paid\)\.  
Red text for purchases \(money farmer owes\)\.

## <a id="_4krhcn6b0al"></a>__5\.5 Farmer App — Order New Inputs \(Tap "सामान चाहिए"\)__

text

┌──────────────────────────────┐

│  ← वापस    🌱 सामान मंगाएं    │

├──────────────────────────────┤

│                              │

│  क्या चाहिए?                  │

│                              │

│  ┌────────────┐              │

│  │ 🌾 बीज     │              │

│  │   Seeds    │              │

│  └────────────┘              │

│  ┌────────────┐              │

│  │ 🧪 खाद     │              │

│  │ Fertilizer │              │

│  └────────────┘              │

│  ┌────────────┐              │

│  │ 🐛 दवाई    │              │

│  │ Pesticide  │              │

│  └────────────┘              │

│  ┌────────────┐              │

│  │ 🔧 उपकरण   │              │

│  │ Equipment  │              │

│  └────────────┘              │

│                              │

│  Tap category → See products │

│  available in FPO catalog    │

│                              │

│  Select product → Select     │

│  quantity \(using \+ \- buttons,│

│  NOT typing\)                 │

│                              │

│  ┌────────────────────────┐ │

│  │ DAP खाद               │ │

│  │ ₹1,350 / बोरी          │ │

│  │                        │ │

│  │     \[−\]  2 बोरी  \[\+\]   │ │

│  │                        │ │

│  │ कुल: ₹2,700            │ │

│  └────────────────────────┘ │

│                              │

│  \[ऑर्डर भेजें / Place Order\]│

│                              │

│  ℹ️ आपका ऑर्डर फील्ड        │

│    ऑफिसर को भेजा जाएगा      │

│                              │

└──────────────────────────────┘

On Submit:

- Order request sent to Moderator \+ Admin
- Farmer sees order in "My Orders" with status: Requested → Confirmed → Dispatched → Delivered

## <a id="_q83u7gwv2ird"></a>__5\.6 Farmer App — Request Field Visit \(Tap "फील्ड विजिट"\)__

text

┌──────────────────────────────┐

│  ← वापस    👨‍🌾 विजिट मांगें  │

├──────────────────────────────┤

│                              │

│  किसलिए?                     │

│                              │

│  ┌────────────────────┐     │

│  │ 🌾 फसल देखनी है     │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 🐛 कीट/रोग की समस्या│     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 💧 सिंचाई में दिक्कत │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 📋 कुछ और          │     │

│  └────────────────────┘     │

│                              │

│  📷 \[फोटो लगाएं\] \(optional\)│

│                              │

│  \[भेजें / Send Request\]     │

│                              │

│  ℹ️ सुरेश भैया को सूचना     │

│    भेजी जाएगी                │

│                              │

└──────────────────────────────┘

On Submit:

- Task created in Moderator's task queue
- Farmer sees confirmation: "आपकी विजिट रिक्वेस्ट भेज दी गई है। सुरेश भैया जल्द संपर्क करेंगे।"

## <a id="_e34g33howfm7"></a>__5\.7 Farmer App — Report Problem \(Tap "समस्या बताएं"\)__

text

┌──────────────────────────────┐

│  ← वापस    ❗ समस्या बताएं    │

├──────────────────────────────┤

│                              │

│  क्या समस्या है?              │

│                              │

│  ┌────────────────────┐     │

│  │ 🐛 फसल में रोग/कीट  │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 🌧️ मौसम से नुकसान   │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 📦 सामान नहीं मिला  │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 💰 भुगतान की समस्या │     │

│  └────────────────────┘     │

│  ┌────────────────────┐     │

│  │ 📋 कुछ और          │     │

│  └────────────────────┘     │

│                              │

│  📷 \[फोटो लगाएं\]            │

│  \(up to 3 photos\)            │

│                              │

│  🎤 \[बोलकर बताएं\]           │

│  \(Voice note — converted     │

│   to text on server\)         │

│                              │

│  \[भेजें / Submit\]            │

│                              │

└──────────────────────────────┘

On Submit:

- Issue created → goes to Moderator \+ Admin
- If disease photo uploaded → Plant Saathi AI processes in background
- Farmer receives acknowledgment: "आपकी शिकायत दर्ज हो गई है। शिकायत नंबर: ISS\-2025\-0089"

## <a id="_3pzfkvyen8ji"></a>__5\.8 Farmer App — My Crop Calendar \(Accessible via tap on crop name on home screen\)__

text

┌──────────────────────────────┐

│  ← वापस    📅 फसल कैलेंडर    │

├──────────────────────────────┤

│  गेहूं HD\-2967 | 1\.2 हेक्टेयर│

│  बुवाई: 12 नवम्बर            │

├──────────────────────────────┤

│                              │

│  ✅ जमीन तैयारी — 28 अक्टूबर │

│  ✅ बुवाई — 12 नवम्बर        │

│  ✅ पहली सिंचाई — 3 दिसम्बर  │

│  ✅ यूरिया डालना — 3 दिसम्बर │

│  ✅ दूसरी सिंचाई — 24 दिसम्बर│

│  ⏳ तीसरी सिंचाई — 14 जनवरी  │ ← आज

│  ⬜ खरपतवार — 20 जनवरी      │

│  ⬜ चौथी सिंचाई — 5 फरवरी   │

│  ⬜ रोग निगरानी — 10–25 फरवरी│

│  ⬜ पांचवी सिंचाई — 25 फरवरी │

│  ⬜ कटाई — 15–25 मार्च       │

│                              │

│  \(Each completed item has    │

│   date of actual completion\) │

│                              │

│  ✅ = हो गया                 │

│  ⏳ = आज करना है             │

│  ⬜ = आने वाला है            │

│                              │

└──────────────────────────────┘

## <a id="_kyzw63wssbu8"></a>__5\.9 Farmer App — Notification Screen__

Accessible via bell icon on home screen\.

text

┌──────────────────────────────┐

│  ← वापस    🔔 सूचनाएं        │

├──────────────────────────────┤

│                              │

│  आज                          │

│  ┌────────────────────────┐ │

│  │ 💧 तीसरी सिंचाई करें    │ │

│  │ 9:00 AM                 │ │

│  └────────────────────────┘ │

│                              │

│  कल                          │

│  ┌────────────────────────┐ │

│  │ ⚠️ पीला रतुआ चेतावनी   │ │

│  │ दवाई छिड़कें             │ │

│  │ 2:30 PM                 │ │

│  └────────────────────────┘ │

│                              │

│  3 दिन पहले                  │

│  ┌────────────────────────┐ │

│  │ 💰 ₹2,200 भुगतान मिला  │ │

│  │ 28 दिसम्बर              │ │

│  └────────────────────────┘ │

│                              │

│  1 हफ्ता पहले                 │

│  ┌────────────────────────┐ │

│  │ 📦 DAP खाद 2 बोरी      │ │

│  │ आपको दी गई             │ │

│  │ 5 जनवरी                │ │

│  └────────────────────────┘ │

│                              │

└──────────────────────────────┘

## <a id="_c6h9u4jxd9r9"></a>__5\.10 Farmer App — What Farmers NEVER See__

This is a critical privacy and security specification:

1. No other farmer's data — name, crop, land, payment, location — nothing
2. No FPO financial data — bank balance, revenue, expenses, profitability
3. No supplier information — names, prices FPO pays, contracts
4. No buyer information — names, prices, contracts
5. No moderator performance data
6. No internal documents — MoA, AoA, resolutions, loans
7. No admin/CEO contact details \(only their assigned moderator\)
8. No other cluster's data
9. No share capital register \(only their own shares\)
10. No inventory details \(only their own orders\)

Database\-level enforcement: Every query from Farmer App includes WHERE farmer\_id = \{logged\_in\_farmer\_id\}\. Row\-level security in PostgreSQL\.

## <a id="_7uqxk3uem3x7"></a>__5\.11 Farmer App — Multi\-Crop Support__

If a farmer has multiple crops in the same season:

Home screen shows crop selector at top:

text

\[गेहूं 🌾\] \[आलू 🥔\] \[सरसों 🌼\]

Tapping a crop switches all data below — tasks, calendar, orders — to that crop context\.

Each crop has its own independent schedule, orders, and advisory\.

## <a id="_9e2dd9294ksp"></a>__5\.12 Farmer App — Accessibility Features__

- Text\-to\-Speech: 🔊 button on every advisory and task card — reads content aloud in selected language
- Large Touch Targets: All buttons minimum 48dp × 48dp
- High Contrast: Dark text on light backgrounds, clear color distinction
- Minimal Text: Icons and images used wherever possible
- No Scrolling Lists Longer Than 10 Items: Pagination with "Load More" button
- Auto\-Brightness Consideration: App uses system font size settings
- Video Tutorials: First\-time users shown 30\-second video walkthrough \(skippable\)

## <a id="_hs0kultgkgg4"></a>__SECTION 6: CROSS\-CUTTING FEATURES \(All Roles\)__

These features span across all user roles\. They are not owned by a single module but are embedded throughout the platform\.

### <a id="_b7gg6hfkj523"></a>__6\.1 Authentication & Session Management__

#### <a id="_nkwpk4jqsfic"></a>__6\.1\.1 Authentication Flow \(All Roles\)__

Mobile OTP\-Based Login \(CEO, Admin, Moderator, Farmer\)

text

Step 1: Enter mobile number \(10\-digit Indian format validation\)

Step 2: Server generates 6\-digit OTP → sends via SMS gateway \(primary\) \+ WhatsApp \(fallback\)

Step 3: OTP valid for 5 minutes → max 3 attempts → after 3 failures, lockout 15 minutes

Step 4: On success → JWT access token \(15 min expiry\) \+ refresh token \(7 days for trusted device, 24 hrs otherwise\)

Step 5: Refresh token rotation — every refresh issues new pair, old refresh token invalidated

Platform Admin Login \(Different Flow\)

text

Step 1: Email \+ password \(min 12 chars, 1 uppercase, 1 number, 1 special\)

Step 2: 2FA via Google Authenticator TOTP or SMS OTP

Step 3: IP whitelist check — reject if not from approved IP/VPN

Step 4: Session token — 30 min inactivity timeout, hard 8\-hour maximum

#### <a id="_kafw82iwg4dc"></a>__6\.1\.2 Session Rules by Role__

__Role__

__Session Duration__

__Trusted Device Memory__

__Concurrent Sessions__

__Force Logout__

Platform Admin

30 min idle / 8 hr max

Not allowed

1 only

On new login elsewhere

CEO

24 hr \(7 days trusted\)

Yes — device fingerprint

2 \(web \+ mobile\)

Optional

Admin

24 hr \(7 days trusted\)

Yes

2

Optional

Moderator

30 days

Yes — app stays logged in

1 \(mobile only\)

On role change

Farmer

90 days

Yes — app stays logged in

1 \(mobile only\)

On number change

#### <a id="_r97pflzcutyo"></a>__6\.1\.3 Device Management__

- Each login records: Device ID, OS, App Version, IP, GPS \(if available\)
- CEO/Admin can see active sessions in "My Profile" → "Active Devices"
- "Logout All Devices" button available
- If a farmer's phone is reported lost → Admin can force\-invalidate all sessions for that farmer

#### <a id="_yvkunfcruy0r"></a>__6\.1\.4 Password/PIN Recovery__

- Mobile users: OTP re\-authentication \(no passwords to recover\)
- Platform Admin: "Forgot Password" → email link \(expires in 1 hour\) → set new password → all sessions invalidated
- If mobile number changes: Admin must update in system → old sessions invalidated → farmer/moderator re\-authenticates on new number

### <a id="_i60ztes79bz9"></a>__6\.2 Role\-Based Access Control \(RBAC\)__

#### <a id="_8ylg2iiddeyb"></a>__6\.2\.1 Permission Matrix__

__Resource / Action__

__Platform Admin__

__CEO__

__Admin__

__Moderator__

__Farmer__

FPO Management

Create FPO

✅

❌

❌

❌

❌

Edit FPO Profile

✅

✅ \(own\)

✅ \(own\)

❌

❌

Suspend FPO

✅

❌

❌

❌

❌

View FPO Dashboard

✅ \(all\)

✅ \(own\)

✅ \(own\)

❌

❌

Farmer Management

Add Farmer

❌

❌

✅

❌

❌

Edit Farmer

❌

❌

✅

❌

❌

View Farmer \(All\)

✅ \(read\)

✅ \(read\)

✅ \(read/write\)

✅ \(own cluster only\)

❌

View Farmer \(Own Profile\)

❌

❌

❌

❌

✅ \(own only\)

Archive Farmer

❌

✅ \(approve\)

✅ \(initiate\)

❌

❌

Export Farmer List

✅

✅

✅

❌

❌

Financial Data

View FPO Financials

✅ \(read\)

✅

✅

❌

❌

Record Payment

❌

❌

✅

✅ \(collection only\)

❌

View Farmer Ledger

✅ \(read\)

✅

✅

✅ \(own cluster\)

✅ \(own only\)

Create Purchase Order

❌

❌

✅

❌

❌

Approve Purchase Order

❌

✅ \(high value\)

✅ \(low value\)

❌

❌

Inventory

View Stock

✅ \(read\)

✅ \(read\)

✅ \(read/write\)

❌

❌

Stock Entry

❌

❌

✅

❌

❌

Documents

Upload Documents

❌

✅

✅

❌

❌

View Documents

✅ \(read\)

✅

✅

❌

❌

Reports

Generate Reports

✅ \(all FPOs\)

✅ \(own\)

✅ \(own\)

❌

❌

Staff/HR

Manage Staff

❌

✅ \(view\)

✅ \(full CRUD\)

❌

❌

View Moderator Performance

✅ \(read\)

✅

✅

✅ \(own only\)

❌

Advisory

Send Advisory

❌

✅ \(broadcast\)

✅ \(broadcast\)

✅ \(own cluster\)

❌

View Advisory

❌

✅

✅

✅ \(own sent\)

✅ \(own received\)

Settings

Platform Settings

✅

❌

❌

❌

❌

FPO Settings

❌

✅ \(some\)

✅ \(full\)

❌

❌

#### <a id="_a9jvoeyezx5u"></a>__6\.2\.2 Row\-Level Security \(RLS\)__

Tenant Isolation \(FPO Level\)

- Every table includes fpo\_id column
- PostgreSQL RLS policies enforce: WHERE fpo\_id = current\_setting\('app\.current\_fpo\_id'\)
- Even if application logic has a bug, database prevents cross\-FPO data access
- Platform Admin bypasses RLS \(special superuser connection\)

Cluster\-Level Isolation \(Moderator\)

- Moderator queries additionally filtered: WHERE cluster\_id IN \(SELECT cluster\_id FROM moderator\_clusters WHERE moderator\_id = \{current\_user\}\)
- Moderator cannot see farmers outside assigned clusters even via direct API

Farmer\-Level Isolation

- Farmer queries: WHERE farmer\_id = \{current\_farmer\_id\}
- No exceptions — no farmer can see any other farmer's data
- Even aggregated data \(like "total farmers in FPO"\) is not exposed to farmer role

#### <a id="_ipe52eyhvv1g"></a>__6\.2\.3 Role Hierarchy & Escalation__

text

Platform Admin

    └── CEO \(per FPO\)

        └── Admin \(per FPO — can be multiple\)

            └── Moderator \(per cluster — can be multiple\)

                └── Farmer \(per cluster — many\)

- Higher role can view everything lower role can view \(within same FPO\)
- Higher role cannot perform lower role's data\-entry actions \(CEO cannot add farmers — separation of duties\)
- Exception: Platform Admin impersonation \(logged with mandatory reason\)

### <a id="_qcslglubf8et"></a>__6\.3 Notification Engine__

#### <a id="_sedr96oz6lij"></a>__6\.3\.1 Notification Channels__

__Channel__

__Used For__

__Roles__

__Cost__

__Reliability__

In\-App Push

All notifications

All

Free

High \(if app installed\)

SMS

OTP, payment reminders, critical alerts

All

₹0\.15/SMS

Very High

WhatsApp Business API

Advisory, order updates, reports

CEO, Admin, Moderator, Farmer

₹0\.50/msg

High

IVR Voice Call

Payment reminders, scheme alerts, weather

Farmer \(low\-tech\)

₹1\.50/call

Medium

Email

Reports, documents, invoices

CEO, Admin, Platform Admin

Free

Medium

Web Push

Browser notifications

CEO, Admin \(web app\)

Free

Low

#### <a id="_wumcm62g7ru4"></a>__6\.3\.2 Notification Types & Routing__

__Notification Type__

__Trigger__

__Recipients__

__Channels__

__Priority__

OTP

Login attempt

Requesting user

SMS \+ WhatsApp

Critical

Payment Received

Payment recorded

Farmer \+ CEO

App \+ SMS

High

Payment Overdue

Cron job \(daily 8 AM\)

Farmer \+ Moderator \+ Admin

App \+ SMS \+ WhatsApp

High

Advisory Alert

Moderator/AI sends

Farmer\(s\)

App \+ WhatsApp \+ IVR

Medium

Weather Warning

Weather API trigger

All farmers in area

App \+ SMS \+ IVR

Critical

Order Status Update

Status change

Farmer

App \+ WhatsApp

Medium

Task Assigned

Admin creates task

Moderator

App

Medium

Task Overdue

Cron job \(daily 8 AM\)

Moderator \+ Admin

App \+ SMS

High

PO Approval Needed

PO created above threshold

CEO

App \+ SMS

High

Compliance Due

Cron job \(daily\)

CEO \+ Admin

App \+ SMS \+ Email

High

Document Expiry

30/60/90 day before

Admin \+ CEO

App \+ Email

Medium

Report Generated

Background job complete

Requesting user

App \+ Email

Low

New Farmer Registered

Farmer added

CEO

App

Low

Moderator Inactive

No activity 3\+ days

Admin \+ CEO

App

Medium

Subscription Renewal

30 days before expiry

CEO \+ Platform Admin

App \+ Email \+ SMS

High

System Downtime

Manual trigger

All CEO/Admins

SMS \+ Email

Critical

#### <a id="_dtm46aho3fog"></a>__6\.3\.3 Notification Template Engine__

Template Structure:

JSON

\{

  "template\_id": "PAYMENT\_REMINDER\_SMS",

  "channel": "SMS",

  "language\_variants": \{

    "hi": "प्रिय \{farmer\_name\}, आपका \{fpo\_name\} में ₹\{amount\} बकाया है। कृपया जल्द भुगतान करें। संपर्क: \{moderator\_mobile\}",

    "en": "Dear \{farmer\_name\}, your outstanding amount with \{fpo\_name\} is ₹\{amount\}\. Please pay soon\. Contact: \{moderator\_mobile\}",

    "mr": "प्रिय \{farmer\_name\}, तुमची \{fpo\_name\} मध्ये ₹\{amount\} थकबाकी आहे\. कृपया लवकर भरणा करा\.",

    "te": "ప్రియమైన \{farmer\_name\}, \{fpo\_name\} లో మీ బకాయి ₹\{amount\}\. దయచేసి త్వరగా చెల్లించండి\."

  \},

  "variables": \["farmer\_name", "fpo\_name", "amount", "moderator\_mobile"\],

  "max\_length": 160,

  "requires\_approval": false

\}

Variable Resolution:

- \{farmer\_name\} → Farmer's name from profile
- \{fpo\_name\} → FPO registered name
- \{amount\} → Calculated from ledger
- \{moderator\_mobile\} → Assigned moderator's number
- \{crop\} → Current season's primary crop
- \{date\} → Relevant date \(due date, event date, etc\.\)
- \{task\} → Current crop calendar task description

WhatsApp Template Approval:

- All WhatsApp templates must be pre\-approved via WhatsApp Business API
- Template categories: Utility \(OTP, alerts\), Marketing \(schemes, advisory\)
- New templates submitted by Admin → reviewed by Platform Admin → submitted to WhatsApp → approved/rejected
- Turnaround: 24–72 hours for approval

#### <a id="_themnu6k0dwi"></a>__6\.3\.4 Notification Preferences \(User\-Configurable\)__

CEO/Admin Preferences:

__Category__

__App__

__SMS__

__WhatsApp__

__Email__

Financial Alerts

✅ Always

✅ On

✅ On

✅ On

Compliance

✅ Always

✅ On

☐ Off

✅ On

Operations

✅ Always

☐ Off

☐ Off

☐ Off

System

✅ Always

✅ On

☐ Off

✅ On

Farmer Preferences \(Simplified\):

text

सूचना कैसे मिले? \(How to receive notifications?\)

☑️ ऐप में \(In App\) — Always on

☑️ WhatsApp पर \(On WhatsApp\)

☑️ SMS से \(Via SMS\)

☑️ फोन कॉल से \(Via Phone Call\)

Quiet Hours:

- Default: 9 PM – 7 AM \(no SMS/WhatsApp/IVR\)
- Exception: Critical weather alerts override quiet hours
- Configurable per FPO by Admin

#### <a id="_400oh8oapy27"></a>__6\.3\.5 Notification Delivery Tracking__

Every notification logged:

text

notification\_id | user\_id | channel | template\_id | content | sent\_at | delivered\_at | read\_at | status

Status values: queued → sent → delivered → read → failed

Failure Handling:

- SMS failed → retry once after 5 minutes → if still fails, try WhatsApp → log failure
- WhatsApp undelivered after 1 hour → fallback to SMS
- IVR unanswered → retry after 2 hours → max 2 retries per day
- Email bounce → mark email as invalid → alert Admin

Delivery Metrics Dashboard \(Platform Admin\):

- SMS delivery rate: target > 95%
- WhatsApp delivery rate: target > 90%
- IVR connection rate: target > 60%
- Average read time \(app notifications\)
- Channel preference distribution

### <a id="_c04089tvwv12"></a>__6\.4 Audit Trail & Activity Logging__

#### <a id="_x0rq9qyhain"></a>__6\.4\.1 What Gets Logged__

Every single data mutation is logged\. No exceptions\.

text

audit\_log \{

  id: UUID

  fpo\_id: UUID

  user\_id: UUID

  user\_role: ENUM \(platform\_admin, ceo, admin, moderator, farmer\)

  action: ENUM \(create, read, update, delete, login, logout, export, approve, reject, send\_notification, impersonate\)

  entity\_type: VARCHAR \(farmer, order, payment, document, stock, advisory, task, \.\.\.\)

  entity\_id: UUID

  old\_values: JSONB \(null for create\)

  new\_values: JSONB \(null for delete\)

  ip\_address: INET

  user\_agent: VARCHAR

  gps\_coordinates: POINT \(if available\)

  timestamp: TIMESTAMPTZ

  session\_id: UUID

  request\_id: UUID \(for correlation\)

  metadata: JSONB \(additional context — impersonation reason, bulk operation batch\_id, etc\.\)

\}

#### <a id="_5gqnzzejsnwl"></a>__6\.4\.2 Audit Log Retention__

- Active logs: 2 years in hot storage \(PostgreSQL\)
- Archive: 2–7 years in cold storage \(S3 \+ Glacier\) — for compliance \(Companies Act requires 8 years for financial records\)
- Purge: After 8 years, permanently deleted \(except financial records — retained per statutory requirements\)

#### <a id="_sjm2pdv3t4ea"></a>__6\.4\.3 Audit Log Access__

__Who__

__What They Can See__

Platform Admin

All logs across all FPOs, searchable, exportable

CEO

All logs within own FPO, searchable, exportable

Admin

All operational logs within own FPO \(not CEO actions on Admin\)

Moderator

Own activity log only

Farmer

Not visible \(but logged server\-side\)

#### <a id="_qm5t9eo2rruw"></a>__6\.4\.4 Audit Dashboard \(CEO/Admin\)__

Recent Activity Stream:

text

10:42 AM — Admin Ramesh edited farmer Seema Devi's mobile number

           Old: 98XXXX1234 → New: 97XXXX5678

           

10:38 AM — Moderator Suresh logged visit for farmer Raju Yadav

           Purpose: Crop Monitoring | Health: Healthy

           

10:15 AM — System generated payment reminder SMS to 11 farmers

           Total overdue: ₹82,000

           

09:55 AM — Admin Ramesh created PO\-2025\-012

           Supplier: Iffco | Product: DAP | Value: ₹1,35,000

Filters:

- Date range \(calendar picker\)
- User \(dropdown\)
- Action type \(multi\-select\)
- Entity type \(multi\-select\)
- Search by entity ID or user name

Export: CSV/Excel — for auditor, NABARD, or legal requirements

#### <a id="_v6a0uyeapzy2"></a>__6\.4\.5 Tamper\-Proof Logging__

- Audit logs are append\-only — no UPDATE or DELETE allowed on audit\_log table
- Database trigger prevents any modification
- Separate database user for audit writes \(application user has INSERT\-only permission\)
- Log integrity check: daily hash chain verification \(each day's log hash includes previous day's hash\)
- If tampering detected → Platform Admin alerted immediately

### <a id="_2plmccfg376"></a>__6\.5 Multi\-Language Support \(i18n / L10n\)__

#### <a id="_ag82ukmy65cr"></a>__6\.5\.1 Supported Languages__

__Language__

__Code__

__Script__

__Direction__

__Status__

Hindi

hi

Devanagari

LTR

Primary — Full Support

English

en

Latin

LTR

Full Support

Marathi

mr

Devanagari

LTR

Full Support

Telugu

te

Telugu

LTR

Full Support

Tamil

ta

Tamil

LTR

Full Support

Kannada

kn

Kannada

LTR

Full Support

Gujarati

gu

Gujarati

LTR

Full Support

Bengali

bn

Bengali

LTR

Full Support

Odia

or

Odia

LTR

Full Support

Punjabi

pa

Gurmukhi

LTR

Full Support

Malayalam

ml

Malayalam

LTR

Phase 2

Assamese

as

Bengali

LTR

Phase 2

#### <a id="_wmqskt8kyv46"></a>__6\.5\.2 Translation Architecture__

Static Content \(UI Labels, Buttons, Menus\):

- Translation files: JSON per language
- Key\-value pairs: "farmer\.name\.label": "किसान का नाम"
- Stored in: /locales/\{lang\_code\}\.json
- Loaded on app init, cached client\-side
- Fallback chain: Selected Language → Hindi → English

Dynamic Content \(Notifications, Advisory, Reports\):

- Template\-based: each template has variants per language
- Generated at send\-time in recipient's preferred language
- AI\-assisted translation for new content \(review before publish\)

User\-Generated Content \(Notes, Issue Descriptions\):

- Stored as\-is in original language
- No auto\-translation \(would distort meaning\)
- Displayed with language tag if different from viewer's language

#### <a id="_hliz4ofvo70j"></a>__6\.5\.3 Language Selection & Persistence__

- First Login: Language selection screen \(mandatory\)
- Persisted: In user profile, survives logout/re\-login
- Changeable: Anytime via profile settings or top bar toggle
- Per\-FPO Default: Admin sets FPO default language \(for new users\)
- Mixed Usage: CEO might use English, Moderator uses Hindi, Farmer uses Telugu — all in same FPO

#### <a id="_1mmybnaxk4ji"></a>__6\.5\.4 Localization Details__

Number Formatting:

- Indian numbering system \(lakhs, crores\) — default
- Option for international \(millions, billions\) — for export/reports
- Example: ₹12,34,567 \(Indian\) vs ₹1,234,567 \(International\)

Date Formatting:

- Display: DD\-MMM\-YYYY \(e\.g\., 18\-Jan\-2025\)
- Month names in selected language: जनवरी, फरवरी, etc\.
- Relative dates in language: "3 दिन पहले", "कल", "आज"

Currency:

- Always INR \(₹\)
- Displayed before amount: ₹1,350
- No decimal for amounts > ₹10 \(whole rupees only for farmer\-facing\)
- Two decimals for accounting/reports

Units:

- Land: Hectare \(default\), Bigha, Acre — configurable per FPO, auto\-conversion
- Weight: Quintal \(qtl\), Kilogram \(kg\), Metric Tonne \(MT\) — auto\-conversion
- Volume: Litre \(L\), Millilitre \(ml\)
- Farmer app shows units in familiar local terms

Calendar:

- Gregorian calendar throughout
- Indian seasons recognized: Kharif \(Jun–Oct\), Rabi \(Nov–Mar\), Zaid \(Mar–Jun\)
- Season names displayed in local language

#### <a id="_eyuoo955p5u0"></a>__6\.5\.5 Voice & Audio__

Text\-to\-Speech \(TTS\):

- Available on Farmer App for all advisory and task cards
- Uses device's built\-in TTS engine
- Pre\-caches common phrases for offline playback
- Languages supported: Hindi, English, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali
- TTS quality: Google TTS API \(online\) / eSpeak \(offline fallback\)

Speech\-to\-Text \(STT\):

- Moderator can dictate visit notes \(voice\-to\-text\)
- Farmer can describe issues by voice
- Processed on\-device for short utterances, server\-side for complex ones
- Languages: Hindi, English \(Phase 1\), others \(Phase 2\)

IVR \(Interactive Voice Response\):

- Pre\-recorded messages in 10 languages
- Menu navigation: "Press 1 for payment reminder, Press 2 for weather advisory"
- Dynamic content read via TTS \(farmer name, amount, crop info\)

### <a id="_wkdgybukz9a6"></a>__6\.6 Search — Global & Contextual__

#### <a id="_burbyqnxwcx1"></a>__6\.6\.1 Global Search \(CEO/Admin — Top Bar\)__

Behavior:

- Type minimum 2 characters → instant results appear in dropdown
- Searches across: Farmers, Orders, Suppliers, Buyers, Documents, Products, Tasks
- Results grouped by category:

text

🔍 "Raju"

👨‍🌾 Farmers:

  Raju Yadav — M\-0234 — Pilkhana — Active

  Raju Sharma — M\-0412 — Hasanpur — Dormant

📦 Orders:

  PO\-2024\-089 — Raju Yadav — DAP Fertilizer — Delivered

💰 Payments:

  ₹2,200 from Raju Yadav — Dec 28, 2024

📄 Documents:

  \(none\)

Search Index:

- PostgreSQL full\-text search with tsvector \+ GIN index
- Supports Hindi/Devanagari search \(ICU collation\)
- Fuzzy matching: "Rju" finds "Raju" \(Levenshtein distance ≤ 2\)
- Phonetic search: "Raaju" finds "Raju" \(Soundex/Metaphone for Indian names\)

#### <a id="_lftek2p7ykfd"></a>__6\.6\.2 Contextual Search \(Within Modules\)__

Each table/list view has its own search bar:

- Farmer list: search by name, mobile, village, farmer ID
- Orders: search by PO number, product name, supplier name
- Payments: search by farmer name, reference number, amount
- Documents: search by document name, tag, category

Search in Farmer App \(Moderator\):

- Simple search bar at top of farmer list
- Search by name or mobile number
- Works offline \(searches cached data using SQLite FTS\)

#### <a id="_9qbz4m4gz8fq"></a>__6\.6\.3 Search Analytics \(Platform Admin\)__

- Most searched terms \(to identify UX gaps\)
- Zero\-result searches \(to identify missing data or naming issues\)
- Search\-to\-action conversion \(did user find what they needed?\)

### <a id="_6mm3277ehcyq"></a>__6\.7 Export & Import Engine__

#### <a id="_l3fj6khf7uno"></a>__6\.7\.1 Export Capabilities__

__Data__

__Formats__

__Who Can Export__

__Max Records__

Farmer List

CSV, Excel, PDF

CEO, Admin, Platform Admin

10,000

Farmer Detail \(Individual\)

PDF \(Report Card\)

CEO, Admin

1 per request

Payment History

CSV, Excel, PDF

CEO, Admin

50,000

Order History

CSV, Excel

CEO, Admin

10,000

Inventory Report

CSV, Excel, PDF

CEO, Admin

5,000

Financial Summary

PDF, Excel

CEO, Admin

N/A \(summary\)

Audit Logs

CSV

CEO, Platform Admin

100,000

NABARD MIS Report

PDF \(specific format\)

CEO, Admin

N/A

Share Capital Register

PDF, Excel

CEO, Admin

5,000

Export Process:

1. User selects data, applies filters, clicks "Export"
2. Background job created \(Bull Queue\)
3. Export processed server\-side \(no client\-side generation for large datasets\)
4. File stored in temporary S3 location \(24\-hour expiry link\)
5. Notification sent to user: "Your export is ready\. \[Download\]"
6. Download link works once \(single\-use token\)
7. Export logged in audit trail

Export Security:

- Sensitive fields masked by default: Aadhaar \(last 4 only\), Bank Account \(last 4 only\)
- Full export of sensitive fields requires additional OTP verification
- Watermark on PDF exports: "Confidential — \{FPO Name\} — Generated by \{User\} on \{Date\}"
- Platform Admin can disable export for specific FPOs \(if security concern\)

#### <a id="_4agm9z9sqfjv"></a>__6\.7\.2 Import Capabilities__

__Data__

__Format__

__Who Can Import__

__Validation__

Farmer Bulk Import

CSV \(template provided\)

Admin

Full validation engine

Payment Bulk Import

CSV \(bank statement\)

Admin

Auto\-matching \+ manual review

Product Master

CSV

Admin

Code/HSN uniqueness check

Village Master

CSV

Admin

State/District/Block validation

Historical Data

CSV \(migration\)

Platform Admin

Custom migration scripts

Import Process:

1. Download template CSV \(with headers, sample data, validation rules in separate sheet\)
2. Fill data in CSV
3. Upload to system
4. Server\-side validation runs:
	- Required field check
	- Format validation \(mobile, Aadhaar, dates\)
	- Uniqueness check \(mobile, Aadhaar, registration number\)
	- Referential integrity \(village exists, moderator exists, crop exists\)
	- Reasonability checks \(land < 50 Ha, age 18–100, etc\.\)
5. Validation report generated:
6. text

Total Rows: 500

✅ Valid: 472

❌ Errors: 28

Download Error Report:

Row 15: Mobile number "987654321" — Invalid \(must be 10 digits\)

Row 23: Aadhaar "1234" — Invalid \(must be 12 digits\)

Row 45: Village "Pilkahna" — Not found in village master\. Did you mean "Pilkhana"?

1. Row 89: Farmer "Raju Yadav" with mobile 9812345678 — Duplicate \(already exists as M\-0234\)
2. Admin reviews, fixes errors in CSV, re\-uploads
3. Confirm import → Background job processes valid records
4. Progress bar with real\-time updates
5. Summary on completion: X created, Y skipped, Z errors

### <a id="_cvc3bcjawmc3"></a>__6\.8 Data Backup & Recovery__

#### <a id="_ydhgwerlxlwn"></a>__6\.8\.1 Backup Strategy__

__Type__

__Frequency__

__Retention__

__Storage__

Full Database Backup

Daily \(2 AM IST\)

30 days

AWS S3 \(encrypted\)

Incremental Backup \(WAL\)

Continuous \(real\-time\)

7 days

AWS S3

Point\-in\-Time Recovery

Any second in last 7 days

7 days

PostgreSQL WAL archiving

Document/File Backup

Daily sync

90 days

S3 Cross\-Region Replication

Redis Cache Snapshot

Every 6 hours

3 days

S3

#### <a id="_2gqy1r398omq"></a>__6\.8\.2 Disaster Recovery__

RPO \(Recovery Point Objective\): < 1 minute \(continuous WAL archiving\)  
RTO \(Recovery Time Objective\): < 1 hour \(automated failover\)

Failover Architecture:

- Primary: AWS ap\-south\-1 \(Mumbai\)
- Standby: AWS ap\-south\-2 \(Hyderabad\)
- Read replicas: 2 in Mumbai region
- Automated failover via AWS RDS Multi\-AZ

Recovery Procedures:

1. Database corruption: Restore from WAL to specific point\-in\-time
2. Accidental deletion \(single record\): Soft delete with 90\-day recovery window; admin can restore
3. Accidental bulk deletion: Restore specific table from backup to temp database → selective restore
4. Full disaster \(region failure\): Automatic failover to Hyderabad region → DNS update → < 30 min total
5. Ransomware/data breach: Isolate affected systems → restore from clean backup → security audit

#### <a id="_ea1nmwcdm9e7"></a>__6\.8\.3 Tenant\-Level Backup__

- Platform Admin can trigger backup for specific FPO
- Used before: FPO migration, data cleanup, tenant deletion
- Exported as encrypted ZIP \(database dump \+ files\)
- Can be used for data portability \(if FPO leaves K2 platform\)

### <a id="_f0s00u1cwomo"></a>__6\.9 File Management & Storage__

#### <a id="_8ifvi5z0ey7e"></a>__6\.9\.1 Storage Architecture__

text

S3 Bucket Structure:

k2\-fpo\-platform/

├── \{fpo\_id\}/

│   ├── documents/

│   │   ├── statutory/

│   │   ├── governance/

│   │   ├── financial/

│   │   └── operational/

│   ├── farmers/

│   │   ├── \{farmer\_id\}/

│   │   │   ├── photo\.jpg

│   │   │   ├── aadhaar\.pdf

│   │   │   ├── land\_record\.pdf

│   │   │   ├── bank\_passbook\.jpg

│   │   │   └── field\_photos/

│   │   │       ├── visit\_2025\-01\-15\_01\.jpg

│   │   │       └── visit\_2025\-01\-15\_02\.jpg

│   ├── inventory/

│   │   └── grn\_photos/

│   ├── exports/

│   │   └── \{export\_id\}\.xlsx \(24\-hour TTL\)

│   └── reports/

│       └── \{report\_id\}\.pdf

#### <a id="_10zxrmlvo2jt"></a>__6\.9\.2 File Handling Rules__

__File Type__

__Max Size__

__Formats Allowed__

__Compression__

__Thumbnail__

Farmer Photo

2 MB

JPG, PNG

Yes \(to 200KB\)

100×100 px

Field Visit Photo

5 MB

JPG, PNG

Yes \(to 500KB\)

200×200 px

Documents \(PDF\)

10 MB

PDF

No

First page preview

Documents \(Image\)

5 MB

JPG, PNG

Yes \(to 1MB\)

200×200 px

Exports

50 MB

XLSX, CSV, PDF

ZIP if > 10MB

N/A

Voice Notes

2 MB

OGG, MP3

Yes

N/A

Upload Process:

1. Client\-side: Format \+ size validation
2. Upload to presigned S3 URL \(direct upload, bypasses server\)
3. S3 Lambda trigger: virus scan \(ClamAV\) → image compression → thumbnail generation
4. Metadata stored in database: file\_id, s3\_key, original\_name, size, mime\_type, uploaded\_by, uploaded\_at, entity\_type, entity\_id
5. Presigned download URLs generated on\-demand \(expire in 15 minutes\)

Storage Quotas \(per subscription tier\):

__Tier__

__Storage Limit__

__Overage__

Basic

5 GB

Alert at 80%, block at 100%

Standard

20 GB

Alert at 80%, block at 100%

Premium

100 GB

Alert at 80%, soft limit

#### <a id="_wlyvyrc8yct1"></a>__6\.9\.3 Data Privacy for Files__

- Aadhaar documents: Stored with AES\-256 encryption at rest; accessed only with additional OTP verification; displayed with masking \(last 4 digits only in UI\)
- Bank documents: Encrypted at rest; account numbers masked in UI
- Photos: No facial recognition or AI analysis on farmer photos \(privacy policy\)
- Field photos: May be analyzed by Plant Saathi AI for crop disease \(with consent\)
- Deletion: When farmer archived, files retained for 2 years \(regulatory\), then permanently deleted
- Access logging: Every file view/download logged in audit trail

### <a id="_50zu8dknmo4c"></a>__6\.10 Offline Capability & Data Sync__

#### <a id="_yjnk2otlymgo"></a>__6\.10\.1 Offline Strategy by Role__

__Role__

__Offline Support__

__Local Storage__

__Sync Strategy__

Platform Admin

None \(always online\)

—

—

CEO

Limited \(dashboard cached\)

Service Worker cache

Background sync on reconnect

Admin

Limited \(read only\)

Service Worker cache

Background sync on reconnect

Moderator

Full \(core features\)

SQLite \+ file cache

Queue\-based sync with conflict resolution

Farmer

Full \(view only, order request\)

SQLite \+ file cache

Queue\-based sync

#### <a id="_p8et85bl4wc"></a>__6\.10\.2 Moderator Offline — Detailed Spec__

What's Cached Locally \(SQLite\):

- All farmers in assigned cluster\(s\): profile, crop details, financial summary, visit history \(last 30 days\)
- Crop calendar for all assigned farmers
- Task queue \(next 7 days\)
- Product catalog \(for input orders\)
- Advisory templates
- Village/cluster master data

Cache Refresh:

- Full refresh: On app launch \(if online\)
- Delta refresh: Every 30 minutes when online \(only changed records since last sync\)
- Manual refresh: Pull\-down\-to\-refresh on any screen
- Cache size: Typically 5–50 MB depending on farmer count

Offline Operations \(Queued for Sync\):

JSON

\{

  "queue": \[

    \{

      "id": "local\-uuid\-001",

      "action": "create\_visit",

      "entity": "visit\_log",

      "data": \{

        "farmer\_id": "uuid\-farmer\-234",

        "purpose": "crop\_monitoring",

        "crop\_health": "healthy",

        "notes": "Crop looking good, no issues",

        "photos": \["local://photo\_001\.jpg"\],

        "gps": \{"lat": 28\.6342, "lng": 77\.4521\},

        "timestamp": "2025\-01\-18T10:42:00\+05:30"

      \},

      "queued\_at": "2025\-01\-18T10:42:30\+05:30",

      "sync\_status": "pending"

    \},

    \{

      "id": "local\-uuid\-002",

      "action": "record\_payment",

      "entity": "payment",

      "data": \{

        "farmer\_id": "uuid\-farmer\-234",

        "amount": 2000,

        "mode": "cash",

        "collected\_by": "moderator\-uuid\-001"

      \},

      "queued\_at": "2025\-01\-18T11:05:00\+05:30",

      "sync\_status": "pending"

    \}

  \]

\}

Sync Process \(When Network Restored\):

1. App detects network availability
2. Queued operations sent in chronological order
3. Each operation: send to server → server processes → returns success/failure
4. On success: local record updated with server\-assigned IDs, sync\_status = "synced"
5. On failure: error logged, item remains in queue, user notified
6. Photos uploaded separately \(larger, may take longer\)
7. Progress indicator: "Syncing 3 of 7 items\.\.\."

Conflict Resolution:

__Scenario__

__Resolution__

Moderator edits visit note offline \+ Admin hasn't touched it

Moderator's version accepted

Moderator records payment offline \+ Admin already recorded same payment

Duplicate detected by amount \+ farmer \+ date within 24 hrs → flag for Admin review

Admin changes farmer profile while moderator is offline

Admin's profile changes take priority; moderator's field data \(visits, payments\) still accepted

Two moderators claim same farmer \(cluster reassignment while offline\)

Earlier timestamp wins; later operation flagged for Admin

#### <a id="_1p35bj1p573w"></a>__6\.10\.3 Farmer App Offline__

Cached:

- Own profile
- Current crop calendar
- Recent transactions \(last 10\)
- Last 5 advisories
- Pending order status

Offline Actions:

- View all cached data
- Mark task as done \(queued\)
- Submit order request \(queued\)
- Submit issue report \(queued — photos stored locally\)

Not Available Offline:

- UPI payment \(requires network\)
- New advisory content
- Weather updates
- Call moderator

### <a id="_xg2ubqgjcoxl"></a>__6\.11 Error Handling & User Feedback__

#### <a id="_khyt3hrszxgg"></a>__6\.11\.1 Error Categories & User Messages__

__Error Type__

__Technical__

__User Message \(Hindi\)__

__User Message \(English\)__

__Action__

Network Error

HTTP timeout / no connection

इंटरनेट कनेक्शन नहीं है। कृपया बाद में कोशिश करें।

No internet connection\. Please try again later\.

Retry button \+ offline mode prompt

Server Error \(5xx\)

Internal server error

कुछ गड़बड़ हो गई। हम ठीक कर रहे हैं।

Something went wrong\. We're fixing it\.

Auto\-retry 3x → show error → log to Sentry

Validation Error

400 Bad Request

कृपया सही जानकारी भरें।

Please enter correct information\.

Highlight specific fields with error messages

Auth Error \(401\)

Token expired

कृपया दोबारा लॉगिन करें।

Please login again\.

Redirect to login

Forbidden \(403\)

Insufficient permissions

आपको यह काम करने की अनुमति नहीं है।

You don't have permission for this action\.

Show message, log attempt

Not Found \(404\)

Resource doesn't exist

यह जानकारी नहीं मिली।

Information not found\.

Back button

Rate Limited \(429\)

Too many requests

कृपया कुछ देर बाद कोशिश करें।

Please try again after some time\.

Cooldown timer shown

File Too Large

> max size

फ़ाइल बहुत बड़ी है। \{max\_size\} से छोटी फ़ाइल अपलोड करें।

File too large\. Upload file smaller than \{max\_size\}\.

Compress suggestion

Duplicate Entry

Unique constraint violation

यह जानकारी पहले से मौजूद है।

This entry already exists\.

Show existing record link

#### <a id="_yhp17uyzhil9"></a>__6\.11\.2 Error Tracking__

Client\-Side:

- Sentry SDK integrated \(React \+ React Native\)
- Captures: JS errors, API failures, render crashes
- Context: user ID, role, FPO, screen, device info, network state
- Breadcrumb trail: last 20 user actions before error

Server\-Side:

- Sentry for application errors
- Structured logging \(Winston/Pino\) → CloudWatch
- Log levels: ERROR \(immediate alert\), WARN \(review daily\), INFO \(audit\), DEBUG \(dev only\)
- Error aggregation: group by type, frequency, affected users

Alerting:

- Error rate > 1% of requests → PagerDuty alert to on\-call engineer
- Specific error type > 10 occurrences in 5 minutes → Slack channel alert
- Database connection failures → immediate PagerDuty escalation

#### <a id="_f6oxmkhiv0vl"></a>__6\.11\.3 Graceful Degradation__

__Feature__

__Normal Mode__

__Degraded Mode__

__Trigger__

Mandi Prices

Live API data

Last cached prices \(with "stale" warning\)

API unavailable

Weather

Live API data

Last cached weather \+ "Updated X hours ago"

API unavailable

SMS Sending

Primary gateway

Failover to secondary gateway

Primary failure

WhatsApp

Business API

Fallback to SMS

WhatsApp API down

Plant Saathi AI

Real\-time analysis

"Analysis queued — results in 30 min"

AI service overloaded

Report Generation

Real\-time

"Report queued — will notify when ready"

Queue depth > 50

File Upload

Direct S3

Server\-proxied upload \(slower\)

S3 presigned URL failure

### <a id="_uvblj95j4zb7"></a>__6\.12 Performance & Loading States__

#### <a id="_ljwoth81ibz"></a>__6\.12\.1 Performance Targets__

__Metric__

__Target__

__Measurement__

Page Load \(Web — First Contentful Paint\)

< 2 seconds

Lighthouse

Page Load \(Web — Time to Interactive\)

< 4 seconds

Lighthouse

API Response \(P50\)

< 200 ms

Server\-side

API Response \(P95\)

< 500 ms

Server\-side

API Response \(P99\)

< 1 second

Server\-side

App Launch \(Cold Start\)

< 3 seconds

React Native Perf

App Launch \(Warm Start\)

< 1 second

React Native Perf

Search Results

< 300 ms

Server\-side

Report Generation \(Small\)

< 10 seconds

Queue processing

Report Generation \(Large\)

< 2 minutes

Queue processing

Image Load

< 1 second

CDN \+ compression

Offline Data Access

< 500 ms

SQLite query

#### <a id="_11cdc9in5axo"></a>__6\.12\.2 Loading States \(UI\)__

Skeleton Screens \(Not Spinners\):

- Every data\-loading area shows a skeleton/shimmer placeholder matching the expected layout
- Farmer list: shimmer cards \(gray rectangles where photo, name, village would be\)
- Dashboard KPI cards: shimmer number boxes
- Charts: shimmer chart area with axis labels

Progressive Loading:

- Dashboard loads in priority order:
	1. KPI cards \(most important — load first\)
	2. Decision feed \(second priority\)
	3. Charts \(third — can be deferred\)
	4. Map \(last — heaviest\)
- Each section loads independently — no "all or nothing"

Pagination:

- Default page size: 25 items \(web\), 10 items \(mobile\)
- "Load More" button \(not infinite scroll — conserves mobile memory\)
- Total count shown: "Showing 1–25 of 847 farmers"
- Cursor\-based pagination \(not offset\-based — performance at scale\)

Empty States:

- When no data exists, show helpful empty state \(not blank screen\)

text

👨‍🌾 अभी कोई किसान नहीं जुड़ा है

No farmers registered yet

\[\+ पहला किसान जोड़ें / Add First Farmer\]

Error States:

- When data fails to load, show error with retry

text

⚠️ डेटा लोड नहीं हो पाया

Could not load data

\[🔄 दोबारा कोशिश करें / Retry\]

### <a id="_5um3wk6cpdss"></a>__6\.13 Help & Support System__

#### <a id="_kw8qa2mw1hwc"></a>__6\.13\.1 In\-App Help \(All Roles\)__

Contextual Help Tooltips:

- \(?\) icon next to every complex field/feature
- Tap → tooltip with 1–2 sentence explanation
- Example: Next to "FPO Credit Score" → "यह स्कोर आपके FPO की समग्र स्वास्थ्य स्थिति दर्शाता है। 0–100 में से अंक, जहाँ 70\+ अच्छा माना जाता है।"

Guided Tours \(First\-Time Use\):

- CEO first login: 5\-step walkthrough highlighting key dashboard areas
- Admin first login: 8\-step walkthrough covering farmer addition, PO creation, payment recording
- Moderator first login: 4\-step mobile walkthrough covering farmer list, visit logging, payment collection
- Farmer first login: 3\-step walkthrough — home screen, account, order
- Tours can be replayed from Settings → "Show Tutorial Again"

Help Center \(Web — CEO/Admin\):

text

┌──────────────────────────────┐

│ 📚 Help Center              │

├──────────────────────────────┤

│ 🔍 Search help articles\.\.\.  │

├──────────────────────────────┤

│ Getting Started              │

│ ├── Adding your first farmer │

│ ├── Creating purchase orders │

│ ├── Recording payments       │

│ └── Understanding dashboard  │

│                              │

│ Farmer Management            │

│ ├── Bulk import guide        │

│ ├── Share capital management │

│ └── Archiving farmers        │

│                              │

│ Finance                      │

│ ├── Bank reconciliation      │

│ ├── Grant tracking           │

│ └── Report generation        │

│                              │

│ Compliance                   │

│ ├── NABARD MIS filing        │

│ ├── AGM preparation          │

│ └── Statutory audit          │

│                              │

│ Video Tutorials              │

│ ├── Dashboard walkthrough    │

│ ├── Farmer registration      │

│ └── Payment collection       │

└──────────────────────────────┘

Video Tutorials:

- 2–5 minute videos per feature
- Recorded in Hindi \+ English
- Hosted on CDN \(not YouTube — to avoid distractions\)
- Subtitles in all supported languages

#### <a id="_49pjoki0uw91"></a>__6\.13\.2 Support Ticket System__

Raise Ticket \(CEO/Admin\):

text

Subject: \[Text\]

Category: \[Technical Issue / Data Problem / Feature Request / Billing / Other\]

Priority: \[Low / Medium / High\]

Description: \[Text area\]

Attachments: \[Up to 3 files\]

Screenshots: \[Capture tool built\-in\]

\[Submit Ticket\]

Ticket Lifecycle:

text

Open → Assigned \(to K2 team member\) → In Progress → Awaiting Response \(from FPO\) → Resolved → Closed

SLA:

__Priority__

__First Response__

__Resolution__

Critical

1 hour

4 hours

High

4 hours

24 hours

Medium

24 hours

72 hours

Low

48 hours

7 days

Moderator/Farmer Support:

- Moderator: "Report a Problem" in app → routed to Admin first → Admin escalates to K2 if needed
- Farmer: "📞 Call करें" button → calls moderator \(not K2 directly\)
- Farmer issues routed: Farmer → Moderator → Admin → K2 \(if unresolved\)

#### <a id="_sbdnunqpfqv7"></a>__6\.13\.3 In\-App Chat \(Phase 2\)__

- CEO/Admin can chat with K2 support team
- Chat widget in bottom\-right corner of web app
- Office hours: 9 AM – 7 PM IST, Mon–Sat
- Off\-hours: Chatbot with FAQ responses \+ ticket creation
- Chat history preserved

### <a id="_ob45egxv4g2i"></a>__6\.14 Print Support__

#### <a id="_drqujbyb9nb1"></a>__6\.14\.1 Printable Documents__

__Document__

__Generated By__

__Format__

__Printer Support__

Farmer Report Card

CEO / Admin

PDF \(A4\)

Any

Share Certificate

Admin

PDF \(A4 Landscape\)

Any

Invoice \(Farmer\)

Auto on distribution

PDF \(A4 / Thermal 80mm\)

Thermal / A4

Payment Receipt

Auto on payment

PDF \(A4 / Thermal 80mm\)

Thermal / A4

Purchase Order

Admin

PDF \(A4\)

Any

GRN \(Goods Receipt Note\)

Admin

PDF \(A4\)

Any

NABARD MIS Report

CEO / Admin

PDF \(A4\)

Any

Financial Summary

CEO / Admin

PDF \(A4\)

Any

Salary Slip

Admin

PDF \(A4\)

Any

Stock Report

Admin

PDF \(A4\)

Any

Dividend Statement

Admin

PDF \(A4\)

Any

Overdue Summary

Admin

PDF \(A4\)

Any

Buyer Contract

Admin

PDF \(A4\)

Any

#### <a id="_pquigwtiedn1"></a>__6\.14\.2 Thermal Printer Support \(For Field Use\)__

- Admin can configure thermal printer \(80mm Bluetooth printer\)
- Invoice and receipt templates formatted for 80mm width
- Connect via Bluetooth from Admin's mobile/tablet
- Auto\-detect printer when in range
- Offline print: Generate locally, print without internet

#### <a id="_xau983p2twtt"></a>__6\.14\.3 PDF Generation Engine__

- Server\-side: Puppeteer \(headless Chrome\) for complex layouts
- Client\-side: jsPDF for simple receipts \(offline capable\)
- Templates: HTML/CSS → rendered to PDF
- Multilingual: PDF renders correctly in all Indic scripts \(Unicode font embedding\)
- Digital signature placeholder on formal documents \(future: eSign integration\)

### <a id="_cy3k3qdna09"></a>__6\.15 Dashboard Customization__

#### <a id="_e0vn7tmtqh6w"></a>__6\.15\.1 CEO Dashboard Customization__

- CEO can rearrange dashboard rows \(drag\-and\-drop on web\)
- CEO can hide/show specific sections:
	- KPI Cards: always visible \(cannot hide\)
	- Decision Feed: always visible
	- Farmer Overview: toggleable
	- Operations Snapshot: toggleable
	- Financial Health: toggleable
	- Compliance Tracker: toggleable
- Preference saved per user
- "Reset to Default Layout" option

#### <a id="_rlz53lre5ast"></a>__6\.15\.2 Saved Filters__

- In any table/list view, user can apply filters → Save as "My View"
- Named views: "Overdue Wheat Farmers", "Large POs This Month", "Dormant Members"
- Quick access from dropdown above table
- Shared views: Admin can create views visible to CEO \(and vice versa\)

#### <a id="_ilk0jtefwehz"></a>__6\.15\.3 Pinned Reports__

- CEO/Admin can pin up to 5 reports to dashboard sidebar
- Pinned reports show mini\-summary \+ "Generate Latest" button
- Example: NABARD MIS Report pinned → shows "Last generated: Jan 5, 2025" \+ \[Regenerate\]

### <a id="_pd5nc6upblrp"></a>__6\.16 Data Validation & Integrity Rules__

#### <a id="_lav13vdw5lf0"></a>__6\.16\.1 Field\-Level Validations__

__Field__

__Validation Rules__

Mobile Number

Exactly 10 digits; starts with 6/7/8/9; unique within FPO

Aadhaar

Exactly 12 digits; Verhoeff checksum validation; unique within FPO

PAN

10 characters: AAAAA9999A format

IFSC

11 characters: AAAA0AAAAAA format; validated against RBI master

Pin Code

6 digits; validated against India Post database

Email

RFC 5322 format \(optional field\)

Land Area

Positive decimal; max 500 Ha \(flag if > 50 Ha\)

Date of Birth

Must be ≥ 18 years ago; must be ≤ 100 years ago

Amount \(₹\)

Positive; max ₹99,99,99,999 \(100 crore\)

Quantity

Positive integer or decimal \(2 places max\)

GPS Coordinates

Lat: 8\.0–37\.0 \(India range\); Lng: 68\.0–97\.5

CIN \(Company Registration\)

21 characters: L/U \+ 5 digits \+ 2 alpha \+ 4 digits \+ 3 alpha \+ 6 digits \+ 1 alpha

GST Number

15 characters: 2 digits \(state\) \+ PAN \+ 1 digit \+ Z \+ 1 checksum

Photo

JPG/PNG; > 10KB < 5MB; minimum 200×200 px

#### <a id="_v9p7u8jprp9z"></a>__6\.16\.2 Business Logic Validations__

__Rule__

__Description__

__Error Message__

No future sowing dates

Sowing date cannot be more than 7 days in future

"बुवाई की तारीख भविष्य में नहीं हो सकती"

Harvest after sowing

Harvest date must be after sowing date

"कटाई बुवाई के बाद होनी चाहिए"

Payment ≤ outstanding

Payment amount cannot exceed outstanding dues

"भुगतान बकाया राशि से अधिक नहीं हो सकता"

Stock ≥ distribution

Cannot distribute more than available stock

"उपलब्ध स्टॉक से अधिक वितरण नहीं किया जा सकता"

PO quantity > 0

Purchase order must have positive quantity

"मात्रा शून्य से अधिक होनी चाहिए"

Share allotment ≤ authorized

Total issued shares cannot exceed authorized capital

"अधिकृत पूंजी सीमा पार हो गई"

Duplicate farmer check

Same mobile OR same Aadhaar in same FPO

"यह किसान पहले से पंजीकृत है"

Budget check on PO

PO value vs available budget \(warning, not block\)

"बजट सीमा से अधिक — CEO अनुमोदन आवश्यक"

Warehouse capacity

Stock receipt cannot exceed warehouse capacity

"गोदाम क्षमता पूर्ण — नई प्राप्ति संभव नहीं"

Expiry validation

Cannot distribute expired products

"यह उत्पाद समाप्त हो चुका है — वितरण संभव नहीं"

#### <a id="_nwv5glvdp1kd"></a>__6\.16\.3 Data Consistency Checks \(Automated — Daily Cron\)__

text

Daily Integrity Check Report:

━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Farmer count matches across tables: 847

⚠️ 3 farmers have invoices but no product distribution record — investigate

✅ Share capital ledger balances: ₹1,08,500

⚠️ 2 payment entries have no matching invoice — possible advance payments

✅ Inventory: Physical records match system \(last audit: Jan 10\)

❌ 1 supplier ledger mismatch: PO\-2024\-089 shows ₹6,75,000 but payments total ₹5,20,000 \(difference unaccounted\)

✅ All farmer mobile numbers unique

✅ All Aadhaar numbers unique

Report sent to Admin \+ Platform Admin\. Critical issues auto\-escalated\.

### <a id="_mz5j2rbb5tn1"></a>__6\.17 Bulk Operations Framework__

#### <a id="_i5ebdl2is01k"></a>__6\.17\.1 Bulk SMS__

- Select recipients: Manual selection / Filter\-based / Segment\-based / All farmers
- Template selection \(from pre\-approved templates\)
- Variable substitution preview: see 3 sample messages before sending
- Schedule: Send Now / Schedule for Later \(date \+ time picker\)
- Rate limiting: Max 1000 SMS per batch; staggered sending \(100/minute\) to avoid gateway throttling
- Delivery report: Sent / Delivered / Failed — per recipient
- Cost estimate shown before confirmation: "This will send 423 SMS\. Estimated cost: ₹63\.45"

#### <a id="_kpu34c3ftjwl"></a>__6\.17\.2 Bulk WhatsApp__

- Same flow as SMS but uses WhatsApp Business API
- Template must be pre\-approved by WhatsApp
- Media support: Can include image/PDF with message
- Interactive buttons: Quick Reply buttons in WhatsApp message
- 24\-hour window: If farmer hasn't messaged FPO recently, only template messages allowed

#### <a id="_6nc7tg8fkauh"></a>__6\.17\.3 Bulk Data Update__

- Select farmers via filter → Apply update:
	- Change cluster assignment
	- Change moderator assignment
	- Update crop details \(season\-level\)
	- Mark attendance for scheme camp
- Preview affected records before applying
- Confirmation with count: "This will update 142 farmer records\. Proceed?"
- Undo available for 24 hours \(audit log stores old values\)

#### <a id="_87sh3q1hf9dc"></a>__6\.17\.4 Bulk Report Generation__

- Generate report for multiple farmers simultaneously
- Example: "Generate Report Card for all 847 farmers" → Background job → ZIP file with 847 PDFs
- Progress: "Generating\.\.\. 234 of 847 complete"
- Estimated time shown based on count

### <a id="_e7du1cumxf0d"></a>__6\.18 Calendar & Scheduling__

#### <a id="_m79138p1f2ud"></a>__6\.18\.1 FPO Calendar \(CEO/Admin View\)__

Integrated calendar showing all events across the FPO:

Event Types:

__Color__

__Type__

__Examples__

🟢 Green

Compliance

AGM, Board Meeting, Filing Due Date

🔵 Blue

Operations

Input Distribution Day, Harvest Start

🟡 Yellow

Financial

Payment Due, Salary Day, Grant Disbursement

🔴 Red

Urgent

Compliance Deadline, Overdue Date

🟣 Purple

External

Mandi Day, Government Camp, Bank Visit

⚪ Gray

Internal

Staff Meeting, Training, Audit

Views:

- Month view \(default\)
- Week view
- Agenda view \(list of upcoming events\)

Creating Events:

- Admin can create any event
- Auto\-generated events: Compliance due dates \(from compliance engine\), crop calendar milestones \(from crop module\), payment due dates \(from billing\)
- Recurring events: Board meetings \(monthly\), salary processing \(monthly\), GST filing \(monthly\)

Calendar Sync:

- Export to Google Calendar / iCal format
- Subscribe URL: Real\-time sync with external calendar apps

#### <a id="_1avmxxcl79o"></a>__6\.18\.2 Moderator Calendar \(Mobile\)__

- Shows only: own tasks, assigned farmer visits, advisory schedule
- Week view on mobile \(optimized for small screen\)
- Tap any day → see tasks for that day
- Swipe between weeks

#### <a id="_wj6allif7n4t"></a>__6\.18\.3 Crop Calendar \(System\-Generated\)__

- Per farmer, per crop, per season
- Automatically created when Admin assigns crop to farmer
- Based on crop schedule template \(from Admin → Crop Management\)
- Adjusted for actual sowing date: if template says "21 days after sowing" and sowing was Nov 12, then task = Dec 3
- Moderator and Farmer both see their respective views of this calendar

### <a id="_xjh7ucvwpupj"></a>__6\.19 Analytics Engine__

#### <a id="_oeusgo47mzdg"></a>__6\.19\.1 Charting Library__

- Web: Recharts \(React\-based, responsive, interactive\)
- Mobile \(CEO\): React Native Charts \(lightweight\)
- Moderator/Farmer: No charts \(too heavy for low\-end devices — use simple progress bars and text summaries\)

#### <a id="_hb256opy3j2i"></a>__6\.19\.2 Standard Chart Interactions__

- Hover: Shows tooltip with exact values
- Click: Drills down to underlying data \(e\.g\., click revenue bar → see revenue transactions for that month\)
- Zoom: Time\-series charts support pinch\-to\-zoom on mobile, scroll\-to\-zoom on web
- Filter: Charts respect active filters \(season, cluster, crop, date range\)
- Export: Every chart has "Download as PNG" and "Download Data as CSV" buttons

#### <a id="_90cvwxtlzf3f"></a>__6\.19\.3 Custom Dashboard \(Phase 2\)__

- CEO/Admin can create custom dashboards
- Drag\-and\-drop chart widgets from a library
- Widget types: KPI card, line chart, bar chart, pie chart, table, map
- Data source selection: Which metric, which dimension, which filter
- Save as named dashboard
- Share with other users in same FPO

### <a id="_qezhh7xhtl5q"></a>__6\.20 Accessibility \(WCAG 2\.1 AA Compliance\)__

#### <a id="_19lfa0ggkw95"></a>__6\.20\.1 Web App Accessibility__

__Requirement__

__Implementation__

Keyboard Navigation

All interactive elements focusable via Tab; Enter/Space to activate

Screen Reader

ARIA labels on all buttons, inputs, charts; semantic HTML

Color Contrast

Minimum 4\.5:1 ratio for text; 3:1 for large text

Focus Indicators

Visible focus ring on all focusable elements

Alt Text

All images have descriptive alt text

Form Labels

Every input has associated label \(visible or ARIA\)

Error Identification

Errors identified by more than color alone \(icon \+ text\)

Resize

UI functional at 200% zoom

Motion

Reduced motion preference respected \(no auto\-animations\)

#### <a id="_nq9vbnkpryp6"></a>__6\.20\.2 Mobile App Accessibility__

__Requirement__

__Implementation__

Touch Target Size

Minimum 48dp × 48dp for all tappable elements

Font Scaling

Respects system font size setting \(up to 200%\)

Screen Reader

TalkBack \(Android\) / VoiceOver \(iOS\) compatible

Color Blind Mode

Patterns \+ icons used alongside colors for status indicators

Text\-to\-Speech

Built\-in TTS for farmer advisory and tasks

Voice Input

Speech\-to\-text for notes and issue descriptions

Haptic Feedback

Vibration on button press for confirmation \(configurable\)

High Contrast

Toggle in app settings for higher contrast theme

## <a id="_i9qtt871lsu5"></a>__SECTION 7: PLANT SAATHI AI MODULE__

Plant Saathi is K2's AI\-powered crop health assistant\. It serves farmers, moderators, and the FPO leadership with intelligent crop management support\.

### <a id="_j0ytanagasx4"></a>__7\.1 Architecture Overview__

text

┌─────────────────────────────────────────────────────┐

│                  Plant Saathi AI                     │

├──────────────┬──────────────┬───────────────────────┤

│ Image        │ Advisory     │ Predictive            │

│ Analysis     │ Engine       │ Analytics             │

│ \(Disease ID\) │ \(Treatment\)  │ \(Yield, Risk\)         │

├──────────────┼──────────────┼───────────────────────┤

│ TensorFlow   │ RAG \(LLM \+   │ Time\-series ML       │

│ Lite \(mobile\)│ Agri KB\)     │ \(scikit\-learn\)        │

│ \+ Cloud API  │              │                       │

├──────────────┴──────────────┴───────────────────────┤

│              Knowledge Base                          │

│  Crop database, disease catalog, treatment protocols │

│  ICAR recommendations, local agronomic data          │

└─────────────────────────────────────────────────────┘

### <a id="_ki0h3jzjpfz"></a>__7\.2 Disease Identification \(Image Analysis\)__

#### <a id="_33r8tja8ei1o"></a>__7\.2\.1 How It Works__

User Flow \(Moderator\):

1. During field visit, moderator sees diseased crop
2. Opens Plant Saathi from within visit log or standalone
3. Takes photo of affected leaf/plant \(camera guided — frame overlay shows optimal framing\)
4. Optional: takes additional photo \(close\-up, wider shot\)
5. Selects crop type \(if not auto\-detected from farmer's profile\)
6. Taps "Analyze / जाँच करें"
7. If online: Photo sent to cloud API → result in 3–5 seconds
8. If offline: TensorFlow Lite model runs on\-device → result in 5–10 seconds \(lower accuracy\)

User Flow \(Farmer\):

1. From home screen → "समस्या बताएं" → "फसल में रोग/कीट"
2. Take photo
3. Photo analyzed \(same flow\)
4. Result shown in simple language

#### <a id="_1uqyj8vkonr1"></a>__7\.2\.2 Analysis Result Screen__

Moderator View:

text

┌──────────────────────────────┐

│ 🔬 Plant Saathi Analysis     │

├──────────────────────────────┤

│ \[Photo displayed\]            │

│                              │

│ 🎯 पहचान / Identification:  │

│ पीला रतुआ \(Yellow Rust\)     │

│ Puccinia striiformis         │

│                              │

│ ⚡ Confidence: 92%           │

│                              │

│ 📋 लक्षण / Symptoms:        │

│ पत्तियों पर पीली धारियाँ,    │

│ पाउडर जैसा पीला पदार्थ     │

│                              │

│ 💊 उपचार / Treatment:       │

│ 1\. Propiconazole 25% EC      │

│    1ml per liter water        │

│    Spray immediately          │

│                              │

│ 2\. Tebuconazole 25\.9% EC     │

│    \(Alternative\)              │

│    1ml per liter water        │

│                              │

│ 📌 सावधानियाँ:               │

│ • सुबह या शाम को छिड़काव करें │

│ • 15 दिन बाद दोबारा करें     │

│ • पड़ोसी खेतों की भी जाँच करें│

│                              │

│ 🌡️ प्रसार जोखिम: HIGH      │

│ \(Current weather favorable    │

│  for disease spread\)          │

│                              │

│ \[📢 Advisory भेजें\]          │

│ \(Send to farmer / all farmers│

│  in cluster with same crop\)  │

│                              │

│ \[📝 Visit Log में जोड़ें\]    │

│ \(Attach to current visit\)    │

│                              │

│ \[❌ गलत पहचान / Wrong ID\]   │

│ \(Feedback to improve model\)  │

└──────────────────────────────┘

Farmer View \(Simplified\):

text

┌──────────────────────────────┐

│ 🌱 फसल जाँच परिणाम         │

├──────────────────────────────┤

│ \[Photo\]                      │

│                              │

│ आपकी फसल में पीला रतुआ     │

│ \(Yellow Rust\) की समस्या है   │

│                              │

│ क्या करें:                   │

│ Propiconazole दवाई           │

│ 1ml प्रति लीटर पानी          │

│ आज ही छिड़काव करें           │

│                              │

│ 🔊 \[सुनें / Listen\]          │

│                              │

│ \[📞 फील्ड ऑफिसर को कॉल करें\]│

│ \[🌱 दवाई ऑर्डर करें\]        │

│                              │

└──────────────────────────────┘

#### <a id="_4xqoe4832ty9"></a>__7\.2\.3 Supported Crops & Diseases \(Phase 1\)__

__Crop__

__Diseases Covered__

__Pests Covered__

Wheat

Yellow Rust, Brown Rust, Loose Smut, Karnal Bunt, Powdery Mildew

Aphid, Termite, Army Worm

Rice/Paddy

Blast, Bacterial Leaf Blight, Brown Spot, Sheath Blight

Stem Borer, Leaf Folder, BPH

Mustard

White Rust, Alternaria Blight, Downy Mildew

Aphid, Painted Bug, Sawfly

Potato

Late Blight, Early Blight, Black Scurf

Cutworm, White Grub, Aphid

Tomato

Early Blight, Late Blight, Bacterial Wilt, Leaf Curl

Whitefly, Fruit Borer, Mite

Cotton

Bacterial Blight, Grey Mildew, Root Rot

Bollworm, Whitefly, Jassid

Soybean

Rust, YMV, Pod Blight

Stem Fly, Girdle Beetle, Defoliator

Maize

Maydis Leaf Blight, Downy Mildew, Stalk Rot

Fall Army Worm, Stem Borer, Cob Borer

Sugarcane

Red Rot, Smut, Wilt

Top Borer, Early Shoot Borer, Pyrilla

Chickpea \(Gram\)

Wilt, Blight, Root Rot

Pod Borer, Cutworm

Total: 10 crops × ~5 diseases × ~3 pests = ~80 disease/pest identifications

Phase 2 adds: Onion, Garlic, Chilli, Groundnut, Sunflower, Mango, Banana, Coconut

#### <a id="_uuruodg9777t"></a>__7\.2\.4 Model Details__

Cloud Model \(Primary\):

- Architecture: EfficientNet\-B4 \(image classification\) \+ YOLOv8 \(lesion detection\)
- Training data: 500,000\+ labeled images from Indian farms \(ICAR datasets, field collection, augmentation\)
- Accuracy: 89% top\-1 accuracy across all classes; 94% top\-3 accuracy
- Inference time: < 2 seconds \(GPU instance\)
- Input: 224×224 px image \(auto\-resized from camera\)
- Output: Top 3 predictions with confidence scores
- Mobile Model \(Offline Fallback\):
	- Architecture: MobileNet\-V3 quantized to TensorFlow Lite
	- Model file size: ~12 MB \(downloaded on first app install, updated silently on Wi\-Fi\)
	- Covers top 40 most common disease/pest combinations \(not the full 80\)
	- Accuracy: 78% top\-1, 88% top\-3 \(lower than cloud due to compression\)
	- Inference time: 5–10 seconds on mid\-range Android \(Snapdragon 400\-series or equivalent\)
	- When offline result is generated, app queues the image for cloud re\-analysis when network returns
	- If cloud result differs from on\-device result, farmer/moderator is notified with updated diagnosis
- Model Update & Retraining Cycle:
	- Quarterly retraining with newly collected field images
	- Feedback loop: every "Wrong ID" tap from moderators adds to retraining queue
	- A/B testing: new model deployed to 10% of users first, accuracy monitored for 2 weeks, then full rollout
	- Model versioning: every deployed model tagged with version, date, accuracy benchmark
	- Rollback capability: if new model underperforms, revert to previous version within 1 hour
- Image Quality Handling:
	- Pre\-analysis quality check: blur detection, darkness detection, too\-far/too\-close detection
	- If image quality is poor, user sees guidance: "फोटो धुंधली है — पास जाकर दोबारा लें" \(Photo is blurry — move closer and retake\)
	- Auto\-crop to leaf/plant region using object detection before classification
	- Multiple image support: if user uploads 2–3 images, ensemble prediction \(higher confidence\)

### <a id="_bhwjczhtzmvh"></a>__7\.3 Advisory Engine \(Treatment Recommendations\)__

- 7\.3\.1 How Advisories Are Generated
- The advisory engine combines multiple inputs to generate context\-aware recommendations:
	- Disease/pest identification from image analysis
	- Crop stage from the farmer's crop calendar \(e\.g\., vegetative vs reproductive — treatment differs\)
	- Weather data from nearest weather station \(rain expected? delay spray\. Too hot? change timing\.\)
	- Farmer's purchase history \(does the farmer already have the recommended pesticide in their recent orders?\)
	- FPO inventory \(is the recommended product available at the FPO warehouse?\)
	- ICAR/SAU recommendations for the region \(state agricultural university protocols\)
	- Resistance patterns \(if a disease has shown resistance to a particular chemical in the area, recommend alternatives\)
- 7\.3\.2 Advisory Content Structure
- Every advisory contains:
	- Problem identified \(disease/pest name in local language \+ scientific name\)
	- Severity assessment \(Low / Moderate / Severe — based on image analysis \+ spread risk\)
	- Immediate action \(what to do right now\)
	- Product recommendation \(chemical name, brand examples available at FPO, dosage per liter/acre\)
	- Application method \(spray technique, timing — morning/evening, repeat interval\)
	- Precautions \(safety gear, pre\-harvest interval, environmental precautions\)
	- Preventive measures \(for future seasons\)
	- Alternative treatment \(organic/IPM option if available\)
	- Escalation guidance \(when to call field officer, when situation needs expert intervention\)
- 7\.3\.3 Knowledge Base
	- Structured database of 500\+ crop\-disease\-treatment combinations
	- Sourced from: ICAR publications, state agricultural university recommendations, CIBRC \(Central Insecticides Board\) approved chemical list
	- Each treatment protocol reviewed by agricultural scientist \(K2 advisory panel\)
	- Regional customization: same disease may have different recommended chemicals based on state/region due to resistance patterns
	- Updated seasonally: new varieties, new chemicals, new resistance data
	- Stored as structured JSON with multi\-language support \(advisory text pre\-translated into all 10 supported languages\)
- 7\.3\.4 Advisory Delivery Channels

__Channel__

__Trigger__

__Format__

__Audience__

App Push Notification

Auto on diagnosis

Short summary \+ tap to view full

Farmer, Moderator

In\-App Detail

On tap

Full advisory with images, dosage table

Farmer, Moderator

WhatsApp Message

Auto or Moderator\-triggered

Text \+ image \(diseased crop \+ treatment card image\)

Farmer

SMS

Fallback if no WhatsApp

Condensed 160\-char message with key action

Farmer

IVR Voice Call

For critical/severe advisories

Pre\-recorded audio in local language, 60\-second message

Farmer

Text\-to\-Speech

On\-demand \(tap 🔊\)

Audio playback of full advisory in\-app

Farmer

- 7\.3\.5 Advisory Templates \(Pre\-built, Editable by Admin\)
- Templates organized by:
	- Crop stage\-based \(routine\): irrigation reminders, fertilizer top\-dressing, weeding schedule
	- Disease\-triggered \(reactive\): specific to identified disease
	- Weather\-triggered \(proactive\): based on weather forecast \(frost advisory, heavy rain pre\-harvest, heat wave\)
	- Market\-triggered \(opportunity\): harvest timing advice based on mandi price trends
- Each template supports variable substitution: \{farmer\_name\}, \{crop\}, \{variety\}, \{product\_name\}, \{dosage\}, \{timing\}, \{moderator\_name\}, \{moderator\_phone\}

### <a id="_xu2rx6fnmani"></a>__7\.4 Predictive Analytics__

- 7\.4\.1 Yield Prediction
- Inputs:
	- Historical yield data for the farmer \(previous seasons from K2 database\)
	- Current crop stage and health observations \(from moderator visit logs\)
	- Area under cultivation
	- Variety planted
	- Sowing date \(early/on\-time/late affects yield\)
	- Input usage \(fertilizer, pesticide application compliance with schedule\)
	- Weather data \(cumulative rainfall, temperature, humidity during growing season\)
	- Soil health card data \(if available — N, P, K levels\)
	- District average yield \(from government data as benchmark\)
- Output:
	- Expected yield range: e\.g\., "38–44 Qtl/Ha" \(with confidence interval\)
	- Comparison: vs farmer's own history, vs cluster average, vs district average
	- Key factors affecting yield \(positive and negative\)
	- Recommendation: what the farmer can still do to improve expected yield
- Where It Appears:
	- CEO Dashboard → Crop Analytics → Expected harvest volume \(aggregated across all farmers\)
	- Moderator → Farmer Detail → below crop calendar
	- Farmer App → not shown directly \(too complex\) — instead, simplified message: "आपकी फसल अच्छी चल रही है" or "फसल में सुधार की जरूरत है — फील्ड ऑफिसर से बात करें"
- Model:
	- Ensemble of linear regression \+ random forest
	- Trained on district\-level yield data \(last 10 years\) \+ FPO\-level data as it accumulates
	- Re\-trained monthly during growing season
	- Accuracy target: within 15% of actual yield 80% of the time
- 7\.4\.2 Disease Risk Prediction
- Inputs:
	- Weather forecast \(next 7 days — temperature, humidity, rainfall, wind\)
	- Historical disease incidence in the area \(from K2's own visit log data \+ government data\)
	- Current crop stage \(certain stages are more susceptible\)
	- Recent disease detections in the cluster \(if 3 farmers in same village report rust, others are at risk\)
- Output:
	- Risk level per disease: Low / Medium / High
	- Risk map: which villages/clusters are at highest risk this week
	- Proactive advisory: "पीला रतुआ का खतरा बढ़ रहा है — 3 दिन में बचाव छिड़काव करें" \(Yellow rust risk increasing — do preventive spray within 3 days\)
- Where It Appears:
	- CEO Decision Feed: "Disease risk alert for 3 clusters — consider preventive advisory"
	- Moderator Home: Alert card with affected farmer count
	- Auto\-triggers proactive advisory to at\-risk farmers \(if Admin has enabled auto\-advisory\)
- 7\.4\.3 Market Price Prediction
- Inputs:
	- Historical mandi prices \(last 3 years, daily granularity, from Agmarknet/eNAM API\)
	- Seasonal patterns \(prices typically rise/fall at specific points in harvest cycle\)
	- National production estimates \(government crop survey data\)
	- Current arrival volumes at nearby mandis
- Output:
	- Price trend forecast: next 2 weeks, next 4 weeks
	- Best sell window recommendation: "Wheat prices expected to peak in Week 2 of March — consider holding harvest until then"
	- Confidence level: High \(strong historical pattern\) / Medium / Low \(unusual market conditions\)
- Where It Appears:
	- CEO Dashboard → Mandi Price section → forecast overlay on price chart
	- CEO Decision Feed: "Opportunity: Wheat price expected to rise 8% in 2 weeks — advise farmers to hold"
- 7\.4\.4 Farmer Churn Prediction
- Inputs:
	- Transaction frequency \(declining? stopped?\)
	- Visit engagement \(does the farmer interact with moderator?\)
	- Payment behavior \(increasing delays?\)
	- App usage \(if farmer app installed — decreasing logins?\)
	- Advisory response \(ignoring advisories?\)
	- Comparison with other farmers who previously churned \(pattern matching\)
- Output:
	- Churn probability per farmer: Low \(<20%\) / Medium \(20–50%\) / High \(>50%\)
	- Churn risk list: farmers sorted by churn probability
	- Recommended retention action: "Visit within 7 days", "Offer input discount", "Resolve pending grievance"
- Where It Appears:
	- CEO Dashboard → Farmer Analytics → "At\-Risk Farmers" section
	- Moderator → farmer cards show a subtle risk indicator \(no score shown — just a flag icon for high\-risk farmers\)
	- Admin → Farmer list can be filtered by churn risk

### <a id="_7bvg552hb3i2"></a>__7\.5 Plant Saathi Chatbot \(Phase 2\)__

- Concept:
	- Conversational AI available within the Farmer App and Moderator App
	- Farmer can ask questions in natural language \(typed or voice\): "मेरी गेहूं की पत्तियों पर पीले धब्बे हैं, क्या करूँ?" \(My wheat leaves have yellow spots, what should I do?\)
	- Chatbot responds with relevant advisory, asks clarifying questions if needed, suggests photo upload
- Technology:
	- LLM \(large language model\) fine\-tuned on agricultural corpus
	- RAG \(Retrieval\-Augmented Generation\): queries the knowledge base for factual treatment recommendations rather than generating from memory
	- Guard rails: chatbot ONLY answers agriculture\-related questions; non\-agricultural queries receive polite redirect
	- All responses grounded in ICAR/SAU recommendations — no hallucinated treatment suggestions
	- Multi\-language support: Hindi, English, and regional languages via translation layer
- Interaction Limits:
	- Farmer: 10 queries per day \(to control API costs\)
	- Moderator: 30 queries per day
	- All conversations logged for quality review and model improvement
- Safety Protocol:
	- If chatbot confidence is below 70%, response includes: "यह जानकारी पक्की नहीं है — अपने फील्ड ऑफिसर से बात करें" \(This information is not confirmed — talk to your field officer\)
	- Chemical dosage recommendations always include safety warnings
	- Chatbot never recommends banned pesticides \(cross\-referenced with CIBRC ban list\)

### <a id="_1v0kvx3fnx5v"></a>__7\.6 AI Dashboard \(CEO & Admin View\)__

- Plant Saathi Summary Panel \(within CEO Dashboard\):
	- Total scans this season: count \+ trend
	- Disease distribution: top 5 diseases detected \(pie chart\)
	- Geographic spread: which clusters have highest disease incidence \(heatmap\)
	- Advisory compliance: % of farmers who received advisory and took action \(measured by follow\-up visit logs\)
	- AI accuracy feedback: % of diagnoses marked correct vs "Wrong ID"
	- Predicted yield summary: total expected harvest volume vs target
- CEO Actions from AI Dashboard:
	- Trigger cluster\-wide advisory based on AI risk prediction
	- View disease hotspot map overlaid on farmer location map
	- Export AI analysis summary for NABARD/government reports

### <a id="_ffqfex5qdw27"></a>__7\.7 Data Privacy & Ethics in AI__

- 
	- All crop images stored are tagged with farmer ID but NO personal identifiers \(Aadhaar, bank details\) are sent to AI services
	- Images processed by cloud API are not used for any purpose other than disease identification and model improvement
	- Farmers are informed \(during app onboarding\) that photos may be used to improve crop health AI
	- No third\-party access to individual farmer AI analysis data
	- Aggregated, anonymized disease trend data may be shared with ICAR/government for public health purposes \(with FPO consent\)
	- AI model training uses only de\-identified images

## <a id="_46omnd1ux9nu"></a>__SECTION 8: IVR & COMMUNICATION MODULE__

### <a id="_zhya0tj7h694"></a>__8\.1 Overview__

- IVR \(Interactive Voice Response\) is critical because many FPO farmers are not smartphone users or are not comfortable with apps\. This module provides voice\-based communication as a parallel channel\.

### <a id="_kf33m245ytvd"></a>__8\.2 IVR Architecture__

- 
	- IVR service provider integration \(Exotel / Ozonetel / KooKoo or equivalent\)
	- Calls initiated by K2 platform \(outbound\) or received from farmers \(inbound\)
	- Call flows defined by Admin, templates managed in platform
	- All calls recorded, transcribed \(speech\-to\-text\), and logged against farmer record
	- Multi\-language support: call plays in farmer's preferred language \(from profile\)

### <a id="_595w9v8y3c0q"></a>__8\.3 Outbound IVR Calls \(Platform to Farmer\)__

- Trigger Types:

__Trigger__

__Content__

__Timing__

Crop Schedule Reminder

"आपकी गेहूं की तीसरी सिंचाई का समय आ गया है"

Day before scheduled task

Advisory Alert

Disease/pest advisory with treatment instructions

When advisory is generated

Payment Reminder

"₹1,800 बकाया है — कृपया जल्द भुगतान करें"

7 days overdue, 15 days, 30 days

Weather Alert

"अगले 48 घंटों में भारी बारिश — फसल सुरक्षित करें"

When weather API triggers alert

Scheme Notification

"PM\-KISAN की किस्त आने वाली है — बैंक खाता जाँचें"

When scheme event is relevant

General Announcement

AGM date, FPO meeting, camp notification

Scheduled by Admin

- Outbound Call Flow:
	- System dials farmer's registered mobile number
	- If farmer picks up: plays pre\-recorded message in farmer's language
	- At end of message: "1 दबाएं अगर समझ गए, 2 दबाएं दोबारा सुनने के लिए, 0 दबाएं फील्ड ऑफिसर से बात करने के लिए" \(Press 1 if understood, 2 to repeat, 0 to talk to field officer\)
	- If 0 pressed: call transferred to moderator's mobile
	- If no answer: retry after 2 hours, then after 4 hours \(max 3 attempts per trigger\)
	- Call status logged: Answered / Not Answered / Busy / Switched Off
- Batch Calling:
	- Admin selects farmer group \(by cluster, crop, segment, or custom filter\)
	- Selects message template
	- Schedules time \(or immediate\)
	- System processes calls in queue \(rate\-limited to avoid carrier blocking — max 50 concurrent calls\)
	- Dashboard shows: total calls, answered, not answered, completed \(pressed 1\), transferred to moderator
	- Calling window: 8 AM to 8 PM only \(no calls outside this window\)

### <a id="_fnsos829v4f9"></a>__8\.4 Inbound IVR \(Farmer Calls FPO\)__

- Dedicated FPO Helpline Number \(virtual number assigned per FPO, or shared toll\-free with FPO selection\)
- Call Flow \(Menu\-driven\):
- text

Welcome: "नमस्कार, \{FPO name\} में आपका स्वागत है"

1 — मेरा हिसाब सुनें \(Hear my account balance\)

    → System reads: "आपकी कुल खरीदारी ₹8,400, भुगतान ₹6,600, बाकी ₹1,800"

2 — सामान ऑर्डर करें \(Order inputs\)

    → "अपनी ज़रूरत बताएं — 1 खाद, 2 बीज, 3 दवाई"

    → On selection: "आपकी रिक्वेस्ट दर्ज हो गई — फील्ड ऑफिसर जल्द संपर्क करेंगे"

    → Request logged in system as input demand

3 — समस्या बताएं \(Report a problem\)

    → "अपनी समस्या रिकॉर्ड करें — बीप के बाद बोलें"

    → Voice recording → transcribed → issue created in system

    → "आपकी शिकायत नंबर \{ISS\-XXXX\} दर्ज हो गई"

4 — फील्ड ऑफिसर से बात करें \(Talk to field officer\)

    → Call transferred to assigned moderator's mobile

    → If moderator doesn't answer in 30 seconds: "फील्ड ऑफिसर उपलब्ध नहीं हैं — कृपया बाद में कॉल करें"

    → Missed call logged as task for moderator

5 — मंडी भाव सुनें \(Hear mandi prices\)

    → "आज \{mandi name\} में गेहूं ₹2,280 प्रति क्विंटल, सरसों ₹5,050\.\.\."

    → Reads top 5 commodities relevant to FPO's crops

- 0 — दोबारा सुनें \(Repeat menu\)
- Inbound Call Logging:
	- Every inbound call logged: farmer ID \(matched by caller number\), option selected, duration, outcome
	- If caller number not recognized \(not registered farmer\): "आपका नंबर हमारे रिकॉर्ड में नहीं है — कृपया अपने FPO से संपर्क करें"
	- Call recordings stored for 90 days \(configurable\)
	- Transcriptions searchable by Admin

### <a id="_aywaipal4ywq"></a>__8\.5 WhatsApp Business Integration__

- Setup:
	- FPO gets a verified WhatsApp Business API number
	- Pre\-approved message templates \(WhatsApp requires template approval for business\-initiated messages\)
	- Farmer opt\-in: collected during registration \(checkbox or verbal consent recorded\)
- Message Types:

__Type__

__Example__

__Template Required?__

Advisory

"राजू भैया, आपकी गेहूं फसल में तीसरी सिंचाई का समय है\.\.\."

Yes

Payment Reminder

"आपका ₹1,800 बकाया है — भुगतान लिंक: \{UPI link\}"

Yes

Order Update

"आपका DAP खाद ऑर्डर तैयार है — फील्ड ऑफिसर से लें"

Yes

Weather Alert

"⚠️ 48 घंटों में भारी बारिश — सिंचाई टालें"

Yes

Receipt

Payment receipt PDF attached

Yes

Mandi Prices

Daily price card image

Yes

Two\-way Chat

Farmer replies to advisory — routed to moderator

No \(session message\)

- Two\-Way Communication:
	- When farmer replies to a WhatsApp message, reply is routed to the assigned moderator's dashboard
	- Moderator can respond from within the K2 platform \(not from personal WhatsApp\)
	- All WhatsApp conversations logged against farmer profile
	- 24\-hour session window: if farmer replies, moderator can send free\-form messages for 24 hours; after that, only template messages
- Rich Media Support:
	- Advisory cards: designed as images \(infographic format — disease photo \+ treatment in local language\)
	- Crop calendar: weekly visual card showing current stage
	- Price chart: daily mandi price comparison card
	- Video: short 30\-second advisory videos \(hosted on CDN, sent as link with thumbnail\)

### <a id="_8daz2wheljlj"></a>__8\.6 SMS Gateway__

- Purpose: Fallback channel for farmers without WhatsApp or smartphones
- Integration: Via SMS aggregator \(MSG91 / Twilio / Gupshup\)
- Message Types:
	- Transactional SMS \(no DND restriction\): payment receipts, OTP, order confirmations
	- Service SMS: advisories, reminders, alerts \(pre\-registered templates with TRAI\)
	- Promotional SMS: scheme announcements, camp notifications \(subject to DND — only to opted\-in farmers\)
- Template Registration:
	- All SMS templates registered with TRAI via DLT \(Distributed Ledger Technology\) platform
	- Template approval takes 2–5 business days
	- Admin manages templates from Settings → Notification Templates
	- Each template has: Template ID \(from DLT\), Content, Variables, Category \(Transactional/Service/Promotional\)
- Delivery Tracking:
	- Status per message: Submitted → Delivered → Failed
	- Failed reasons tracked: Invalid number, DND, Network error, Operator issue
	- Delivery report dashboard: success rate by operator, by region
	- Retry logic: failed messages retried once after 30 minutes
- SMS Cost Management:
	- Per\-SMS cost tracked against FPO's subscription plan
	- Monthly SMS quota per plan tier
	- Overage billed separately or capped \(configurable per FPO\)
	- Admin can see: SMS sent this month, remaining quota, cost incurred

### <a id="_tt1xtr7q2qy4"></a>__8\.7 Notification Priority & Channel Selection Logic__

- When a notification needs to be sent to a farmer, the system decides the channel based on:
	- Urgency: Critical \(disease outbreak, weather emergency\) → ALL channels simultaneously \(App \+ WhatsApp \+ SMS \+ IVR\)
	- Farmer's App Status: If farmer has app installed and active \(opened in last 7 days\) → App push first, WhatsApp second
	- Farmer's WhatsApp Status: If farmer has WhatsApp and opted in → WhatsApp for non\-critical messages
	- Fallback: If no app and no WhatsApp → SMS
	- IVR Trigger: Used for farmers who are not reachable via any digital channel \(no smartphone\) OR for critical alerts to ALL farmers
	- Farmer Preference: If farmer has set channel preference in app settings → respect preference
	- Quiet Hours: No SMS/WhatsApp/IVR between 9 PM and 7 AM \(configurable by Admin\) — messages queued for morning delivery
- Channel Selection Matrix:

__Scenario__

__App__

__WhatsApp__

__SMS__

__IVR__

Routine advisory \(crop schedule\)

✅ Primary

✅ If no app

❌

❌

Disease alert \(moderate\)

✅

✅

✅

❌

Disease alert \(severe\)

✅

✅

✅

✅

Payment reminder

✅

✅ \(with UPI link\)

✅

After 30 days overdue

Weather emergency

✅

✅

✅

✅

Order update

✅

✅

❌

❌

Scheme notification

✅

✅

✅

❌

Payment receipt

✅

✅ \(PDF\)

✅ \(text\)

❌

### <a id="_gq5zlhimwcig"></a>__8\.8 Communication Analytics \(Admin & CEO View\)__

- Dashboard:
	- Messages sent this month: by channel \(App/WhatsApp/SMS/IVR\) — bar chart
	- Delivery rate: % delivered successfully by channel
	- Read/engagement rate: App \(opened notification\), WhatsApp \(blue ticks\), SMS \(delivered, no read data\), IVR \(answered \+ pressed 1\)
	- Cost: SMS cost, IVR call cost — by month
	- Farmer reachability: % of farmers reachable via at least one digital channel vs IVR\-only vs unreachable
	- Unreachable farmers list: no valid phone, all channels failed — needs moderator physical visit

## <a id="_h9gcjo8j6340"></a>__SECTION 9: MANDI PRICE INTELLIGENCE MODULE__

### <a id="_gffeu76x24p8"></a>__9\.1 Overview__

- This module provides real\-time and historical commodity price data from agricultural markets \(mandis\), enabling the CEO and Admin to make informed selling decisions and advise farmers on optimal harvest timing\.

### <a id="_7f50ohrrjvtb"></a>__9\.2 Data Sources__

__Source__

__Data Available__

__Update Frequency__

__Integration Method__

Agmarknet \(agmarknet\.gov\.in\)

Daily mandi prices for 300\+ commodities across 7,000\+ mandis

Daily \(previous day\)

Web scraping \+ API \(where available\)

eNAM \(enam\.gov\.in\)

Real\-time trading prices from e\-NAM mandis

Near real\-time

API integration

NAFED

MSP, procurement prices

As announced

Manual entry \+ notification

State Marketing Boards

State\-specific mandi data

Daily

API / scraping per state

Custom Sources

Local mandi intelligence from FPO's own traders

As reported

Manual entry by Admin

- Data Processing Pipeline:
	- Raw price data collected nightly \(batch job at 11 PM\)
	- Data cleaned: remove outliers \(prices 3× standard deviation from mean\), fill missing days \(interpolation\)
	- Stored in time\-series database \(or PostgreSQL with date partitioning\)
	- Aggregated: daily average, weekly average, monthly average per commodity per mandi
	- Commodity name normalization \(different mandis may use different names for same commodity\)

### <a id="_erfotx3hfws0"></a>__9\.3 Mandi Configuration \(Admin\)__

- Admin configures which mandis and commodities are relevant for their FPO:
- Select Mandis:
	- Search by state, district, mandi name
	- Select 3–10 mandis closest to FPO operational area
	- Primary mandi \(default for price comparisons\) vs secondary mandis
- Select Commodities:
	- Auto\-suggested based on FPO's crop configuration
	- Admin can add additional commodities
- MSP Tracking:
	- Admin enters MSP \(Minimum Support Price\) when government announces
	- MSP comparison shown on all price charts as a reference line

### <a id="_hwmscst2yi0x"></a>__9\.4 Price Dashboard \(CEO & Admin View\)__

- Live Price Ticker \(Top of Operations Module\):
	- Horizontal scrolling strip showing today's prices for configured commodities at primary mandi
	- Each commodity: Name | Price \(₹/Qtl\) | Change from yesterday \(↑/↓ %\) | Mini sparkline \(7\-day trend\)
- Detailed Price View \(per commodity\):
- Price Chart:
	- Interactive line chart: daily price for last 30 / 60 / 90 / 365 days \(toggle\)
	- Multiple mandis overlaid \(different colored lines\)
	- MSP line \(horizontal reference\)
	- FPO's locked buyer price \(if contracts exist\) shown as horizontal band
	- Shaded zones: green \(FPO price > mandi price, good deal\), red \(FPO price < mandi price, review\)
- Price Comparison Table:

__Mandi__

__Today's Price__

__Yesterday__

__Weekly Avg__

__Monthly Avg__

__Monthly High__

__Monthly Low__

Primary formatted with actual data

- Seasonal Pattern:
	- Same commodity, same mandi — average price by week of year \(overlay of last 3 years\)
	- Shows typical seasonal pattern: when prices usually peak, when they dip
	- Helps CEO decide: "Hold harvest for 2 more weeks — prices historically peak in Week 2 of March"
- Price Alerts \(Configurable by CEO/Admin\):
	- Set alert: "Notify me when Wheat in Agra mandi crosses ₹2,300/Qtl"
	- Set alert: "Notify me when Tomato price drops below ₹1,000/Qtl"
	- Alerts delivered via CEO Decision Feed \+ SMS/WhatsApp

### <a id="_6t5dhqdv5a14"></a>__9\.5 Farmer\-Facing Price Information__

- Farmer App — Mandi Prices Section:
	- Shows only commodities the farmer is growing
	- Simple display: "आज का भाव" \(Today's price\) — commodity name, price, direction arrow
	- No complex charts — just the number and whether it's going up or down
	- Available via IVR \(menu option 5\) in audio format
- WhatsApp Daily Price Card:
	- Auto\-generated image card sent every morning \(7 AM\) to opted\-in farmers
	- Shows 3–5 commodities with prices at primary mandi
	- Designed as a shareable image \(farmers forward to peers — organic awareness\)

### <a id="_ec9q0c6jliee"></a>__9\.6 Sell Decision Support \(CEO\)__

- Sell Decision Card \(appears in CEO Decision Feed when conditions are met\):
- Conditions triggering sell recommendation:
	- Price has risen above FPO's cost basis by configurable margin \(e\.g\., >15%\)
	- Price is near seasonal peak \(based on historical pattern\)
	- Buyer bid received that exceeds current mandi price
	- Warehouse stock is aging \(for perishables — holding cost increasing\)
	- Weather risk: heavy rain forecast may damage stored produce
- Card content:
	- Current price, trend direction, historical context
	- Available quantity in warehouse
	- Active buyer bids \(if any\)
	- Recommendation: "Consider selling" or "Hold — price likely to increase" with reasoning
	- Actions: Accept buyer bid, Create sale order, Notify farmers to bring produce, Dismiss

## <a id="_296slywa0sza"></a>__SECTION 10: COMPLIANCE & GOVERNANCE MODULE__

### <a id="_4vg5oud1o1ya"></a>__10\.1 Overview__

- FPOs \(registered as Producer Companies under Companies Act, 2013\) have significant regulatory compliance requirements\. This module tracks, reminds, and helps generate compliance artifacts\.

### <a id="_rtc6cp1pvc53"></a>__10\.2 Compliance Calendar__

- Visual Calendar View:
	- Monthly calendar showing all compliance deadlines
	- Color\-coded: Green \(completed\), Yellow \(upcoming in 30 days\), Red \(overdue\), Gray \(future\)
	- Click any item → detail view with status, documents, actions
- Compliance Items Tracked:
- A\. Companies Act / ROC Filings:

__Filing__

__Frequency__

__Typical Due Date__

__Form__

__Status Tracking__

Annual Return \(MGT\-7A\)

Annual

Within 60 days of AGM

MCA e\-form

Draft → CA Review → Board Approval → Filed

Financial Statements \(AOC\-4\)

Annual

Within 30 days of AGM

MCA e\-form

Draft → Audited → Board Approval → Filed

Director KYC \(DIR\-3 KYC\)

Annual

September 30

MCA e\-form

Each director tracked separately

Board Meeting

Quarterly \(min\)

Within 120 days of previous

Minutes document

Scheduled → Conducted → Minutes Uploaded

AGM \(Annual General Meeting\)

Annual

Within 6 months of financial year end

Multiple documents

Notice → Conducted → Minutes → Resolution Filed

Change in Directors \(DIR\-12\)

Event\-based

Within 30 days of change

MCA e\-form

Tracked when director changes

Registered Office Change \(INC\-22\)

Event\-based

Within 30 days

MCA e\-form

Tracked if applicable

- B\. Tax Compliance:

__Filing__

__Frequency__

__Due Date__

__Status Tracking__

Income Tax Return

Annual

October 31 \(if audited\)

Data Prepared → CA Filing → Acknowledgment Received

Tax Audit \(if turnover > ₹1 Cr\)

Annual

September 30

Auditor Appointed → Audit Started → Report Ready → Filed

TDS Returns \(if applicable\)

Quarterly

Jul 31, Oct 31, Jan 31, May 31

Computed → Filed → Challan Paid

GST Return \(if registered\)

Monthly/Quarterly

20th of following month

GSTR\-1 → GSTR\-3B → Payment

Advance Tax \(if applicable\)

Quarterly

Jun 15, Sep 15, Dec 15, Mar 15

Estimated → Paid

- C\. NABARD / SFAC / Government Reporting:

__Report__

__Frequency__

__Due Date__

__Format__

NABARD MIS Report

Quarterly

15th of month following quarter

Prescribed NABARD format

SFAC Progress Report

Quarterly/Half\-yearly

As per grant terms

SFAC template

Utilization Certificate

Per grant

As per sanction letter

Government format

Equity Grant Status Report

Half\-yearly

Per SFAC schedule

SFAC template

Annual Performance Report

Annual

March end

Custom \+ NABARD template

- D\. Operational Compliance:

__Item__

__Frequency__

__Responsibility__

Statutory Audit

Annual

External auditor

Internal Audit \(if required\)

Quarterly

Internal/External

Stock Audit

Annual or as required

Admin \+ Auditor

Share Register Update

Continuous

Admin

Member Register Maintenance

Continuous

Admin

Minutes Book Maintenance

Continuous

Admin

### <a id="_7grp431miat1"></a>__10\.3 Compliance Workflow__

- For each compliance item:
	- Auto\-reminder: 90 days, 60 days, 30 days, 15 days, 7 days, 3 days, 1 day before due date
	- Reminders sent to: CEO \(always\), Admin \(always\), Assigned person \(if set\)
	- Status progression: Not Started → In Progress → Under Review → Completed → Filed/Submitted
	- Document attachment: each compliance item has a document slot — upload the completed form/report/minutes
	- Verification: Admin marks as done → CEO confirms → status changes to Completed
	- Late filing tracking: if done after due date, system records delay in days — affects compliance score
- Compliance Summary \(CEO & Admin Dashboard\):
- text

Total Compliance Items This Year: 24

Completed On Time: 18 \(75%\)

Completed Late: 3 \(12\.5%\)

Pending: 2 \(due in next 30 days\)

Overdue: 1 ⚠️

- Not Yet Due: 0

### <a id="_ce842jt94gv5"></a>__10\.4 Board Meeting Management__

- Schedule Meeting:
	- Date, time, venue
	- Agenda items \(text — multiple items, each numbered\)
	- Auto\-generate notice \(PDF template with FPO letterhead, agenda, date, signed by secretary\)
	- Notice distribution: send to all directors via WhatsApp/Email/SMS
- Meeting Conduct:
	- Attendance tracker: list of directors — mark present/absent
	- Quorum check: auto\-calculate if minimum quorum met \(1/3 of directors or 2, whichever is higher\)
	- If quorum not met: alert — "Meeting cannot proceed — quorum not met\. Reschedule required\."
- Minutes Recording:
	- Template\-based minutes generator: FPO name, date, venue, attendees, agenda items, discussions, resolutions
	- Each resolution: Resolution text, Proposed by, Seconded by, Vote \(Unanimous / Majority — for/against count\)
	- Admin fills in discussions and resolutions
	- Generate minutes PDF — formal format with FPO letterhead
	- Upload signed minutes \(scanned copy\)
	- Minutes linked to the meeting record
- Resolution Tracking:
	- Each resolution tracked as an action item
	- Assigned to: person responsible
	- Due date
	- Status: Pending → In Progress → Completed
	- Resolution register: searchable list of all resolutions passed

### <a id="_sa49avfb8gqr"></a>__10\.5 AGM Management__

- AGM Preparation Checklist:
	- Set AGM date \(within 6 months of financial year end\)
	- Prepare agenda \(template provided — standard AGM items \+ special business\)
	- Prepare notice \(21 clear days before AGM\)
	- Prepare financial statements \(audited balance sheet, P&L\)
	- Prepare directors' report
	- Prepare auditor's report
	- Prepare list of members \(with shareholding\)
	- Arrange venue, logistics
- AGM Notice Generation:
	- Auto\-generated from template: FPO name, date, time, venue, agenda items, proxy form
	- Distribution: SMS to all members \+ WhatsApp \+ physical notice \(print PDF for distribution\)
	- Notice acknowledgment tracking: who received, who didn't
- AGM Conduct:
	- Member attendance register \(digital or physical → uploaded\)
	- Quorum verification
	- Each agenda item: discussion notes, resolution passed \(ordinary/special\)
	- Voting: show of hands or poll \(for special resolutions\)
	- Chairman's remarks
- Post\-AGM:
	- Minutes generation \(template\-based\)
	- File minutes with ROC within 30 days
	- Update resolutions register
	- Implement approved actions \(new directors, auditor appointment, etc\.\)

### <a id="_z46b3qojcw32"></a>__10\.6 Audit Management__

- Auditor Details:
	- Auditor name, firm, registration number, contact details
	- Appointment date, tenure
	- Engagement letter upload
- Audit Process Tracking:
- text

Auditor Appointed → Engagement Letter Signed → Data Shared → 

Field Work Started → Draft Report Received → Queries Resolved → 

- Final Report Received → Board Approved → Filed with ROC
	- Each stage: date, notes, documents
	- Query management: auditor raises queries → Admin responds → track resolution
- Audit Document Checklist:
	- Auto\-generated list of documents auditor typically needs
	- Check off as shared: Bank statements, Ledgers, Invoices, PO copies, Contracts, Minutes, Share register, Fixed asset register
	- Percentage completion: "You've shared 18 of 24 required documents"

### <a id="_ojibm7app1if"></a>__10\.7 NABARD MIS Report Generator__

- This is one of the most critical features — NABARD mandates quarterly MIS reports from FPOs\.
- Report Sections \(auto\-populated from K2 data\):
	- FPO Profile: Name, registration, address, CEO, directors — pulled from FPO profile
	- Membership Details: Total members, new members this quarter, gender split, category split \(SC/ST/OBC/General\), small/marginal farmer count — pulled from farmer database
	- Share Capital: Authorized, issued, paid\-up, calls in arrears — pulled from share capital module
	- Business Activities:
		- Input supply: volume, value, products — pulled from orders module
		- Output marketing: volume, value, buyers — pulled from sales module
		- Other services: custom hiring, processing — manual entry or from services module
	- Financial Summary: Revenue, expenses, surplus, bank balance — pulled from finance module
	- Capacity Building: Training programs conducted, participants — manual entry
	- Governance: Board meetings held, AGM conducted, audit status — pulled from compliance module
	- Challenges & Action Plan: Text entry by CEO/Admin
- Generation Process:
	- Admin clicks "Generate NABARD MIS" → selects quarter
	- System auto\-fills all available data
	- Highlights fields that need manual input \(yellow\)
	- Admin/CEO reviews, fills gaps, edits if needed
	- Generate PDF in NABARD\-prescribed format
	- Download / email to NABARD contact
	- Mark as "Submitted" with submission date

### <a id="_a1pv0yuhx4qb"></a>__10\.8 Scheme & Grant Compliance__

- For each active scheme/grant, track:
	- Scheme name, sanctioning authority \(NABARD / SFAC / State Govt / Other\)
	- Sanction letter \(uploaded document\)
	- Sanctioned amount, disbursed amount, utilized amount
	- Utilization certificate due date
	- Expenditure tracking: line items against grant budget
	- Variance report: budgeted vs actual spending per line item
	- UC \(Utilization Certificate\) generation: auto\-populated from expenditure records, formatted per government template
	- Submission tracking: UC submitted → accepted → closed
- Grant Budget Tracker:
- text

SFAC Equity Grant — ₹5,00,000

├── Component 1: Working Capital — Budget ₹2,00,000 → Spent ₹1,85,000 \(92\.5%\)

├── Component 2: Infrastructure — Budget ₹1,50,000 → Spent ₹1,42,000 \(94\.7%\)

├── Component 3: Capacity Building — Budget ₹1,00,000 → Spent ₹65,000 \(65\.0%\)

└── Component 4: Admin Costs — Budget ₹50,000 → Spent ₹38,000 \(76\.0%\)

Total: Budget ₹5,00,000 → Spent ₹4,30,000 \(86\.0%\)

- UC Due: March 31, 2025 — 72 days remaining

## <a id="_4hy94zz7m8yh"></a>__SECTION 11: DATA ARCHITECTURE & TECHNICAL INFRASTRUCTURE__

### <a id="_dnbpaobvbv71"></a>__11\.1 Multi\-Tenant Architecture__

- Tenancy Model: Shared Database, Shared Schema, Tenant\-ID Isolation
	- Every table in the database includes an fpo\_id column
	- Every query includes WHERE fpo\_id = \{current\_tenant\} — enforced at ORM/middleware level, not relying on application code alone
	- PostgreSQL Row\-Level Security \(RLS\) policies as second line of defense
	- Connection pool shared across tenants \(managed by PgBouncer or equivalent\)
	- No tenant can ever access another tenant's data — tested with automated cross\-tenant penetration tests
- Why this model \(not separate databases per tenant\):
	- FPOs are numerous \(hundreds to thousands\) but individually small \(few thousand rows each\)
	- Separate databases would be operationally expensive and slow to provision
	- Shared schema enables cross\-tenant analytics for Platform Admin
	- Migrations run once, apply to all tenants
- Tenant Isolation Testing:
	- Automated test suite that creates two test tenants, inserts data, and verifies that queries from Tenant A never return Tenant B's data
	- Run on every deployment

### <a id="_tl1j0aqz4b84"></a>__11\.2 Database Design Principles__

- Primary Database: PostgreSQL 15\+
	- Chosen for: ACID compliance, JSON support \(for flexible metadata\), RLS, mature ecosystem, excellent performance at scale
	- Partitioning: large tables \(transactions, audit\_logs, visit\_logs\) partitioned by fpo\_id or by date range
	- Indexing strategy:
		- Every foreign key indexed
		- Composite indexes on frequently filtered combinations \(e\.g\., fpo\_id \+ season\_id \+ status\)
		- Partial indexes for status\-based queries \(e\.g\., WHERE status = 'overdue'\)
		- Full\-text search index on farmer name, village name \(for search functionality\)
- Key Entity Groups:
	- Tenant & Auth: fpos, users, roles, permissions, sessions, audit\_logs
	- Farmer: farmers, farmer\_land, farmer\_bank, farmer\_documents, farmer\_schemes, farmer\_shares
	- Crop & Season: seasons, crops, crop\_varieties, crop\_schedules, farmer\_crops, crop\_stages
	- Operations: purchase\_orders, po\_line\_items, grn \(goods receipt notes\), distribution, invoices, invoice\_line\_items
	- Inventory: warehouses, stock\_entries, stock\_movements, batches
	- Finance: payments, farmer\_ledger, supplier\_ledger, buyer\_ledger, bank\_accounts, bank\_transactions, reconciliation
	- Suppliers & Buyers: suppliers, buyers, contracts, contract\_line\_items
	- HR: staff, attendance, tasks, task\_logs, salary\_records, leave\_records
	- Communication: notifications, sms\_logs, whatsapp\_logs, ivr\_logs, advisory\_logs
	- AI: ai\_scan\_logs, ai\_results, disease\_catalog, treatment\_protocols
	- Compliance: compliance\_items, board\_meetings, meeting\_attendees, resolutions, agm\_records, audit\_records, scheme\_grants
	- Documents: documents, document\_versions
	- Mandi: mandis, commodities, daily\_prices
	- Geography: states, districts, blocks, villages, clusters
- Naming Conventions:
	- Table names: lowercase, plural, snake\_case \(e\.g\., farmer\_crops\)
	- Column names: lowercase, snake\_case \(e\.g\., created\_at, updated\_by\)
	- Primary keys: id \(UUID v4\)
	- Foreign keys: \{entity\}\_id \(e\.g\., farmer\_id, fpo\_id\)
	- Timestamps: created\_at, updated\_at on every table \(auto\-populated\)
	- Soft delete: deleted\_at \(nullable timestamp\) on entities that support archival
	- Audit columns: created\_by, updated\_by \(user ID\) on every table

### <a id="_in35ta1uld8k"></a>__11\.3 Caching Layer__

- Redis \(or Redis\-compatible: AWS ElastiCache / Upstash\)
- What is cached:
	- Session data \(user sessions, JWT blacklist\)
	- Frequently accessed reference data: crop master, product master, village master — TTL 24 hours
	- Dashboard KPI computations — TTL 5 minutes \(recomputed in background\)
	- Mandi prices \(latest\) — TTL 1 hour
	- Rate limiting counters \(API rate limits per user/FPO\)
	- Bull Queue job metadata
- What is NOT cached:
	- Farmer personal data \(PII — always from database\)
	- Financial transactions \(must be real\-time accurate\)
	- Audit logs \(must be written directly to database\)
- Cache Invalidation:
	- On data write: invalidate related cache keys
	- Time\-based TTL as fallback
	- Manual cache flush available to Platform Admin \(for troubleshooting\)

### <a id="_9chxy22e2fu9"></a>__11\.4 File Storage__

- Object Storage: AWS S3 \(or compatible: MinIO for self\-hosted, DigitalOcean Spaces\)
- Bucket Structure:
- text

k2\-fpo\-platform/

├── \{fpo\_id\}/

│   ├── documents/

│   │   ├── statutory/

│   │   ├── governance/

│   │   ├── financial/

│   │   └── operational/

│   ├── farmer\-photos/

│   ├── farmer\-documents/

│   ├── visit\-photos/

│   ├── ai\-scans/

│   ├── invoices/

│   ├── reports/

- │   └── exports/
- Access Control:
	- Bucket policy: no public access
	- All access via pre\-signed URLs \(time\-limited — 15 minutes\)
	- Pre\-signed URLs generated by API server on authorized request
	- Each FPO's folder is a logical boundary — API never generates URLs for cross\-tenant files
- File Processing:
	- Image uploads: auto\-compressed to max 1MB \(using Sharp or similar server\-side library\)
	- Document uploads: virus scanned before storage
	- Thumbnails: auto\-generated for images \(100×100 for lists, 300×300 for previews\)
	- PDF generation: reports and invoices generated server\-side \(using Puppeteer or PDFKit\), stored in S3, download link sent to user
- Storage Quotas:
	- Per\-FPO storage quota based on subscription tier
	- Platform Admin monitors usage
	- Alert at 80% usage → Admin notified
	- At 100%: new uploads blocked, existing data preserved

### <a id="_wvz1e7gmwz8r"></a>__11\.5 Background Job Processing__

- Queue System: Bull Queue \(backed by Redis\)
- Job Types:

__Job__

__Trigger__

__Priority__

__Max Duration__

__Retry__

Send SMS batch

Admin triggers bulk SMS

Medium

30 min

3 retries

Send WhatsApp batch

Admin triggers broadcast

Medium

30 min

3 retries

IVR call batch

Admin schedules calls

Medium

2 hours

2 retries

Generate report \(PDF\)

User clicks "Generate"

Low

10 min

2 retries

Bulk farmer import \(CSV\)

Admin uploads CSV

Medium

15 min

1 retry

AI image analysis

Photo uploaded

High

30 sec

3 retries

Mandi price fetch

Nightly cron \(11 PM\)

Low

30 min

3 retries

Bank statement reconciliation

Admin uploads statement

Medium

5 min

1 retry

Dashboard KPI refresh

Every 5 min \(cron\)

Low

2 min

1 retry

Compliance reminder check

Daily \(8 AM\)

Low

5 min

2 retries

Expiry alerts \(documents, stock\)

Daily \(9 AM\)

Low

5 min

2 retries

Offline sync processing

When moderator comes online

High

5 min

5 retries

Export to Excel/CSV

User requests export

Low

10 min

2 retries

- Job Monitoring \(Platform Admin\):
	- Queue depth dashboard: pending, active, completed, failed — by job type
	- Failed job list with error details and retry button
	- Job processing time: average, P95 — by type
	- Alert if queue depth exceeds threshold \(e\.g\., >100 pending jobs\)

### <a id="_77ug073bzytb"></a>__11\.6 API Design__

- RESTful API with the following conventions:
	- Base URL: https://api\.k2fpo\.in/v1/
	- Authentication: Bearer token \(JWT\) in Authorization header
	- Tenant context: extracted from JWT \(user's fpo\_id\)
	- Request/Response format: JSON
	- Pagination: cursor\-based for large lists \(not offset\-based — offset is slow on large tables\)
	- Filtering: query parameters \(e\.g\., ?status=active&crop=wheat&cluster=sikandrabad\)
	- Sorting: ?sort=name:asc,created\_at:desc
	- Partial response: ?fields=name,mobile,village \(only return requested fields\)
	- Error format: \{ "error": \{ "code": "FARMER\_NOT\_FOUND", "message": "\.\.\.", "details": \{\.\.\.\} \} \}
	- Rate limiting: 100 requests/minute per user, 1000 requests/minute per FPO
	- Versioning: URL\-based \(/v1/, /v2/\) — old versions supported for 12 months after new version release
- Key API Endpoints \(Grouped\):
	- /auth/\* — login, OTP, refresh, logout
	- /farmers/\* — CRUD, search, filter, bulk import, profile, ledger
	- /crops/\* — crop master, farmer\-crop assignment, schedules
	- /orders/\* — purchase orders, distribution, invoices
	- /inventory/\* — stock entries, movements, GRN
	- /payments/\* — record payment, reconciliation, receipts
	- /suppliers/\*, /buyers/\* — CRUD, ledgers, contracts
	- /finance/\* — summaries, cash flow, receivables, payables
	- /compliance/\* — items, meetings, resolutions, AGM
	- /reports/\* — generate, list, download
	- /notifications/\* — list, mark read, preferences
	- /ai/\* — scan image, get advisory, feedback
	- /mandi/\* — prices, alerts, configuration
	- /admin/\* — staff, clusters, settings, documents
	- /platform/\* — \(Platform Admin only\) FPO management, subscriptions, system health

### <a id="_ikfj9buybatl"></a>__11\.7 Search Architecture__

- Primary Search: PostgreSQL Full\-Text Search \(Phase 1\)
	- tsvector columns on searchable entities \(farmers, products, villages, documents\)
	- Search query parsed with plainto\_tsquery or websearch\_to\_tsquery
	- Search across multiple entities: unified search bar returns results grouped by type
	- Hindi/multilingual search: PostgreSQL unaccent extension \+ custom dictionary for transliterated Hindi
- Advanced Search: Elasticsearch/Meilisearch \(Phase 2\)
	- For faster, typo\-tolerant, faceted search
	- Indexed entities: farmers, products, documents, mandis
	- Auto\-sync from PostgreSQL via change data capture \(Debezium or custom trigger\)
	- Facets: search results show filters \(by village, crop, status\) with counts

## <a id="_4mf1wuxhzvts"></a>__SECTION 12: SECURITY & PRIVACY__

### <a id="_b9iey424qetv"></a>__12\.1 Authentication & Authorization__

- Authentication:
	- All user authentication via OTP \(mobile number \+ OTP\) — no passwords for FPO users \(CEO, Admin, Moderator, Farmer\)
	- Platform Admin: email \+ password \+ 2FA \(TOTP via Google Authenticator\)
	- OTP delivery: SMS \(primary\) with WhatsApp fallback
	- OTP validity: 5 minutes, single\-use
	- OTP rate limiting: max 5 OTP requests per number per hour
	- JWT tokens: short\-lived access token \(15 minutes\) \+ long\-lived refresh token \(7 days or 30 days based on trust\)
	- Refresh token rotation: on every refresh, old token invalidated
	- Token blacklisting: on logout or password change, all active tokens for that user invalidated \(via Redis blacklist\)
- Authorization \(RBAC — Role\-Based Access Control\):

__Permission__

__Platform Admin__

__CEO__

__Admin__

__Moderator__

__Farmer__

View all FPOs

✅

❌

❌

❌

❌

Create/Edit FPO

✅

❌

❌

❌

❌

View FPO Dashboard

✅ \(all\)

✅ \(own\)

✅ \(own\)

❌

❌

Manage Farmers

❌

Read

Full CRUD

Read \(own cluster\)

Own profile only

Manage Orders

❌

Approve

Full CRUD

View \(own cluster\)

Request only

Manage Inventory

❌

Read

Full CRUD

❌

❌

Manage Finance

❌

Read

Full CRUD

Record payments

View own ledger

Manage Compliance

❌

Read \+ Confirm

Full CRUD

❌

❌

Generate Reports

❌

Generate

Generate \+ Customize

❌

❌

View Analytics

❌

Full

Full

Own performance

❌

Manage Staff

❌

Read

Full CRUD

❌

❌

Manage Documents

❌

Read \+ Upload

Full CRUD

❌

❌

AI Scan

❌

View results

View results

Scan \+ Send advisory

Scan \(simplified\)

System Settings

✅

❌

Configure

❌

❌

- Permission enforcement at three layers:
	- API middleware: checks role against endpoint permission matrix before processing request
	- Database \(RLS\): PostgreSQL row\-level security ensures tenant isolation even if API layer is bypassed
	- UI: components not rendered if user lacks permission \(but never rely on UI\-only enforcement\)

### <a id="_blq9yxvf3c1t"></a>__12\.2 Data Encryption__

- In Transit:
	- All API communication over HTTPS \(TLS 1\.2 minimum, TLS 1\.3 preferred\)
	- HSTS \(HTTP Strict Transport Security\) enabled
	- Certificate: Let's Encrypt \(auto\-renewal\) or AWS ACM
	- API to database: within private VPC, but encrypted connection enforced \(sslmode=require\)
- At Rest:
	- Database: encrypted at storage level \(AWS RDS encryption or disk\-level encryption\)
	- S3 buckets: server\-side encryption \(SSE\-S3 or SSE\-KMS\)
	- Sensitive fields \(Aadhaar, bank account numbers\): application\-level encryption using AES\-256 before storage
		- Encryption key stored in AWS KMS or HashiCorp Vault — NOT in application code or environment variables
		- Key rotation: annual, with re\-encryption of all affected records
		- Decryption only on explicit access \(not in list views — show masked values\)
- Aadhaar\-Specific Handling:
	- Stored encrypted \(AES\-256\) — never in plaintext in database
	- Displayed as XXXX\-XXXX\-4523 \(last 4 digits only\) in all UI views
	- Full Aadhaar accessible only to Admin, and only after re\-authentication \(OTP\)
	- Aadhaar not included in any export/report unless explicitly required \(NABARD farmer list\) — and then only with CEO approval
	- Aadhaar not sent to any third\-party service
	- Audit log entry created every time Aadhaar is accessed \(viewed or exported\)

### <a id="_236sgixxh9fl"></a>__12\.3 Data Privacy Compliance__

- Applicable Regulations:
	- Digital Personal Data Protection Act, 2023 \(India\)
	- Aadhaar Act \(specific to Aadhaar handling\)
	- RBI guidelines \(if financial data is involved\)
	- IT Act, 2000 \(general cybersecurity obligations\)
- Privacy Principles Implemented:
	- Purpose Limitation: Data collected only for stated FPO management purposes
	- Data Minimization: Only collect what's needed \(e\.g\., Aadhaar not mandatory if not required by scheme\)
	- Consent: Farmer consent recorded at registration \(digital consent checkbox or verbal consent noted by moderator\)
	- Right to Access: Farmer can view all their data in the app
	- Right to Correction: Farmer can request correction via moderator or app — Admin processes
	- Right to Erasure: Farmer can request account deletion — data anonymized after 90\-day retention period
	- Data Retention:
		- Active data: retained as long as farmer is a member
		- Archived farmer data: retained for 7 years \(statutory requirement for financial records\)
		- After retention period: PII anonymized, transaction data retained for analytics
	- Data Portability: Farmer can request export of their data \(PDF report card\)
	- Breach Notification: In case of data breach, affected users notified within 72 hours
- Privacy by Design Measures:
	- Default visibility: minimum necessary\. Each role sees only what they need\.
	- No cross\-farmer data visibility for farmers
	- No cross\-cluster data visibility for moderators
	- No cross\-FPO data visibility for FPO users
	- Logs and exports never contain full Aadhaar or full bank account numbers
	- Test/development environments use anonymized data \(never production data\)

### <a id="_fnvgihgqqpbj"></a>__12\.4 Security Monitoring & Incident Response__

- Logging:
	- All API requests logged: timestamp, user, role, endpoint, method, request size, response code, response time, IP, user\-agent
	- All authentication events logged: login attempts \(success/fail\), OTP requests, token refreshes
	- All data modification events logged: entity type, entity ID, field changed, old value, new value, user, timestamp
	- All file access events logged: document viewed, downloaded, uploaded, deleted
	- Logs stored in centralized log management \(ELK Stack or CloudWatch Logs or Grafana Loki\)
	- Log retention: 1 year \(compliance requirement\)
- Alerting:
	- Multiple failed login attempts from same IP \(>10 in 5 minutes\) → alert to Platform Admin \+ temporary IP block
	- Multiple failed OTP attempts for same number \(>5 in 30 minutes\) → alert \+ temporary number lockout
	- Unusual data export volume \(e\.g\., Admin exports all farmer data at 2 AM\) → alert
	- Admin accessing more than 50 farmer Aadhaar records in one session → alert
	- API response time P95 > 2 seconds for 5 consecutive minutes → alert
	- Database CPU > 80% for 10 minutes → alert
	- Any 5xx error rate > 1% → alert
- Incident Response Plan:
	- Severity levels: P1 \(data breach / system down\) → P4 \(minor issue\)
	- P1: respond within 15 minutes, resolve within 4 hours
	- P2: respond within 1 hour, resolve within 24 hours
	- P3: respond within 4 hours, resolve within 72 hours
	- P4: respond within 24 hours, resolve within 1 week
	- Post\-incident review for P1/P2: root cause analysis, preventive measures documented
- Vulnerability Management:
	- Dependency scanning: automated \(npm audit, Snyk or similar\) — run on every build
	- OWASP Top 10 checklist: all API endpoints reviewed against common vulnerabilities
	- Penetration testing: annual, by third\-party security firm
	- Bug bounty: considered for Phase 2 \(once platform is mature\)

## <a id="_8pyndtm5f352"></a>__SECTION 13: INTEGRATION & API ECOSYSTEM__

### <a id="_f97ye1iodmh"></a>__13\.1 External Integrations__

- 13\.1\.1 Agmarknet / eNAM \(Mandi Prices\)
	- Data fetched daily via web scraping or API
	- Fallback: manual price entry by Admin if API is down
	- Data mapped to K2's commodity master \(name normalization\)
	- Historical data backfilled for last 3 years on FPO onboarding
- 13\.1\.2 Weather API
	- Provider: OpenWeatherMap / IMD \(India Meteorological Department\) API / Tomorrow\.io
	- Data points: temperature, humidity, rainfall, wind speed, forecast \(7\-day\)
	- Resolution: district\-level \(block\-level if available\)
	- Fetch frequency: every 6 hours
	- Stored per FPO's location — used in:
		- Farmer App weather card
		- AI disease risk prediction
		- Advisory triggering \(weather\-based\)
		- CEO Decision Feed weather alerts
- 13\.1\.3 SMS Gateway
	- Provider: MSG91 / Twilio / Gupshup \(configurable per deployment\)
	- DLT compliance: all templates registered
	- Delivery reports: webhook\-based \(provider calls K2 API with delivery status\)
	- Failover: if primary gateway fails, automatic switch to secondary
- 13\.1\.4 WhatsApp Business API
	- Provider: Meta Cloud API \(direct\) or via BSP \(360dialog / Gupshup / Twilio\)
	- Webhook for incoming messages: processed and routed to moderator
	- Template message submission and approval workflow managed in K2 admin
	- Media handling: images, PDFs sent as media messages
- 13\.1\.5 Payment Gateway \(Phase 2\)
	- For UPI payment link generation and auto\-reconciliation
	- Provider: Razorpay / Cashfree / PhonePe Business
	- Flow: Generate payment link → send to farmer → farmer pays → webhook notifies K2 → auto\-record payment
	- Not a full payment gateway integration \(FPO is not an e\-commerce site\) — only for farmer\-to\-FPO payments
- 13\.1\.6 Bank Statement Parsing
	- Standard CSV/OFX/MT940 format parsing
	- Bank\-specific parsers for major banks \(SBI, PNB, BOB, HDFC, ICICI format variations\)
	- Intelligent transaction matching: narration parsing, UPI ID extraction, amount \+ date matching
- 13\.1\.7 IFSC / Bank Verification
	- IFSC code lookup: Razorpay IFSC API \(open\-source dataset\)
	- Bank account verification \(penny drop\): via payment gateway API — verify that account exists and name matches
	- Used during farmer registration to validate bank details
- 13\.1\.8 Aadhaar Verification \(Phase 2\)
	- UIDAI e\-KYC or offline XML\-based verification
	- Only if FPO requires Aadhaar verification for scheme linkage
	- Consent\-based: farmer must explicitly consent
	- Data minimization: only verify — don't store full Aadhaar demographics from UIDAI
- 13\.1\.9 Government Scheme APIs \(Future\)
	- PM\-KISAN beneficiary status check
	- Soil Health Card data fetch
	- Crop insurance enrollment status
	- KCC application status
	- These APIs are often unreliable or non\-existent — built as optional, with manual data entry as fallback

### <a id="_vmafk8kwtp5z"></a>__13\.2 Webhook & Event System__

- Internal Event Bus:
	- Key events published to internal event system \(Redis Pub/Sub or lightweight event emitter\)
	- Events trigger downstream actions \(notifications, analytics updates, AI processing\)
- Key Events:

__Event__

__Triggers__

farmer\.created

Welcome SMS, moderator notification, dashboard update

farmer\.updated

Audit log, sync to cache

order\.created

Moderator notification, CEO approval \(if threshold\), inventory check

order\.fulfilled

Invoice generation, farmer notification, inventory update

payment\.recorded

Receipt generation, ledger update, farmer notification, overdue recalculation

visit\.logged

Dashboard update, farmer activity update, AI trigger \(if photos\)

issue\.flagged

CEO notification, admin notification, AI analysis \(if photo\)

advisory\.sent

Delivery tracking, communication log

compliance\.approaching\_due

CEO \+ Admin notification

stock\.below\_reorder

Admin \+ CEO alert

price\.alert\_triggered

CEO notification

ai\.scan\_completed

Result delivered to user, logged for analytics

- External Webhooks \(Phase 2\):
	- Allow K2 Platform Admin to configure webhooks for specific events
	- Use case: third\-party analytics tools, government reporting systems, donor reporting dashboards
	- Webhook payload: JSON with event type, timestamp, relevant data \(tenant\-filtered\)
	- Retry logic: 3 retries with exponential backoff
	- Webhook secret: HMAC signature for payload verification

## <a id="_m2m3nut57fgl"></a>__SECTION 14: DEPLOYMENT & DEVOPS__

### <a id="_7wwtezlmtt4o"></a>__14\.1 Infrastructure__

- Cloud Provider: AWS \(Primary\) — adaptable to Azure/GCP
- Production Environment:

__Component__

__Service__

__Specification__

Web Server / API

AWS ECS \(Fargate\) or EC2 \+ Docker

2 vCPU, 4GB RAM, auto\-scaling \(2–8 instances\)

Database

AWS RDS PostgreSQL

db\.r6g\.large \(2 vCPU, 16GB RAM\), Multi\-AZ for HA

Cache

AWS ElastiCache \(Redis\)

cache\.t3\.medium, single node \(cluster for scale\)

Object Storage

AWS S3

Standard tier, lifecycle policies for archival

CDN

AWS CloudFront

For static assets \(React app build, images, PDFs\)

DNS

AWS Route 53

With health checks and failover

Load Balancer

AWS ALB

SSL termination, path\-based routing

Queue

Redis \(same ElastiCache instance or separate\)

For Bull Queue

Monitoring

AWS CloudWatch \+ Grafana

Metrics, logs, dashboards

Secrets

AWS Secrets Manager or SSM Parameter Store

API keys, database credentials, encryption keys

CI/CD

GitHub Actions or AWS CodePipeline

Automated build, test, deploy

- Staging Environment:
	- Mirrors production but smaller instances \(single\-AZ, smaller DB\)
	- Used for QA testing, UAT, and pre\-release verification
	- Separate database with anonymized data
	- Accessible to K2 team only
- Development Environment:
	- Local Docker Compose setup for developers
	- PostgreSQL, Redis, MinIO \(S3\-compatible\), all running in containers
	- Seed data scripts for consistent development experience

### <a id="_d2ghblk0pftc"></a>__14\.2 Deployment Strategy__

- Branching Strategy: GitFlow
	- main — production\-ready code
	- develop — integration branch for next release
	- feature/\* — individual feature branches
	- hotfix/\* — urgent production fixes
	- release/\* — release preparation
- Deployment Pipeline:
- text

Code Push → Lint & Format Check → Unit Tests → Integration Tests →

Build Docker Image → Push to Container Registry → Deploy to Staging →

Automated Smoke Tests → Manual QA Approval → Deploy to Production →

- Health Check → Monitor for 30 minutes → Done \(or Rollback\)
- Production Deployment:
	- Blue\-Green deployment: new version deployed alongside old, traffic switched after health check
	- Rollback: automatic if health check fails; manual trigger available for Platform Admin
	- Zero\-downtime: rolling updates with readiness checks
	- Database migrations: run before deployment, backward\-compatible \(no breaking changes\)
	- Feature flags: new features can be deployed but toggled off — enabled per\-FPO or globally
- Deployment Frequency:
	- Production releases: bi\-weekly \(every 2 weeks\) for features
	- Hotfixes: deployed within hours as needed
	- Mobile app updates: monthly \(due to app store review times\)
	- Mobile app backward compatibility: API supports current and previous mobile app version simultaneously

### <a id="_y7p7ae9658c9"></a>__14\.3 Backup & Disaster Recovery__

- Database Backups:
	- Automated daily snapshots \(AWS RDS automated backups\)
	- Retention: 30 days
	- Point\-in\-time recovery: enabled \(last 5 minutes\)
	- Weekly full backup exported to separate AWS account \(cross\-account for safety\)
	- Monthly backup tested: restore to staging environment and verify data integrity
- S3 Backups:
	- Versioning enabled on all buckets \(recover from accidental deletion\)
	- Cross\-region replication to secondary region \(e\.g\., Mumbai → Hyderabad\)
	- Lifecycle policy: move old versions to S3 Glacier after 90 days
- Disaster Recovery Plan:
	- RPO \(Recovery Point Objective\): 5 minutes \(point\-in\-time recovery\)
	- RTO \(Recovery Time Objective\): 1 hour \(failover to secondary region\)
	- Tested quarterly: simulate primary region failure, verify failover

### <a id="_tcpg0hvj39u"></a>__14\.4 Performance & Scaling__

- Performance Targets:

__Metric__

__Target__

API response time \(P50\)

< 200ms

API response time \(P95\)

< 500ms

API response time \(P99\)

< 1 second

Dashboard load time

< 2 seconds

Farmer App home screen load

< 3 seconds \(on 3G\)

Report generation \(PDF\)

< 30 seconds

AI image analysis \(cloud\)

< 5 seconds

Search results

< 300ms

Bulk import \(1000 farmers\)

< 2 minutes

Concurrent users supported

5,000 \(initial\), scalable to 50,000

- Scaling Strategy:
	- Horizontal scaling: API servers auto\-scale based on CPU/memory/request count
	- Database scaling: read replicas for reporting/analytics queries; primary for writes
	- Queue scaling: worker instances auto\-scale based on queue depth
	- CDN: static assets and generated reports served via CDN \(low latency globally\)
	- Database connection pooling: PgBouncer to manage connection limits
- Performance Monitoring:
	- APM \(Application Performance Monitoring\): New Relic / Datadog / custom Grafana dashboards
	- Real User Monitoring \(RUM\): track actual page load times from user devices
	- Slow query log: PostgreSQL queries > 500ms logged and reviewed weekly
	- API endpoint profiling: identify slowest endpoints, optimize

## <a id="_jwywc8p41dal"></a>__SECTION 15: TESTING STRATEGY__

### <a id="_7gz90e1zc7k1"></a>__15\.1 Testing Pyramid__

- Unit Tests \(Base — Most Numerous\):
	- Every business logic function tested in isolation
	- Coverage target: 80% of business logic code
	- Mocked dependencies \(database, external APIs\)
	- Run on every commit \(pre\-push hook \+ CI pipeline\)
	- Framework: Jest \(for Node\.js backend\), React Testing Library \(for frontend\)
- Integration Tests \(Middle Layer\):
	- Test API endpoints end\-to\-end with real database \(test database, seeded data\)
	- Test multi\-step workflows: farmer creation → order → payment → ledger verification
	- Test role\-based access: verify CEO cannot edit farmer, moderator cannot see other clusters
	- Test tenant isolation: create data in Tenant A, verify Tenant B cannot access
	- Run on every PR merge to develop branch
	- Framework: Supertest \(API testing\) \+ test database \(Docker PostgreSQL\)
- End\-to\-End Tests \(Top Layer — Fewer, Critical Paths\):
	- Automated browser tests for critical user journeys:
		- Admin creates farmer → Farmer appears in CEO dashboard → Moderator sees farmer in app
		- Admin creates PO → CEO approves → Goods received → Distributed → Invoice generated → Payment recorded
		- Farmer takes AI scan → Result displayed → Advisory sent
		- Compliance deadline approaching → Notifications fired → Report generated
	- Run nightly on staging environment
	- Framework: Playwright or Cypress
	- Mobile app E2E: Detox \(React Native testing\)
- Manual Testing:
	- Exploratory testing before each release
	- UAT \(User Acceptance Testing\) with actual FPO staff \(2–3 pilot FPOs\)
	- Usability testing for farmer app: test with actual farmers, observe interaction, iterate
	- Accessibility testing: screen reader compatibility, color contrast, touch target sizes

### <a id="_3yzbf2qop9ok"></a>__15\.2 Special Test Categories__

- Multi\-Language Testing:
	- Every screen tested in all 10 supported languages
	- Check for text overflow, truncation, RTL issues \(if Urdu is ever added\)
	- Check that dynamic content \(farmer names, product names\) displays correctly in all languages
- Offline Testing \(Mobile Apps\):
	- Simulate offline mode: toggle airplane mode during various operations
	- Verify all offline\-capable features work correctly
	- Test sync: go offline → perform actions → come online → verify data synced correctly
	- Test conflict resolution: Admin edits farmer while moderator is offline editing same farmer
- Performance Testing:
	- Load test: simulate 5,000 concurrent users hitting API
	- Stress test: gradually increase load until system breaks — identify breaking point
	- Soak test: sustained moderate load for 24 hours — check for memory leaks, connection leaks
	- Database: test with 500 FPOs × 1,000 farmers each = 500,000 farmer records — verify query performance
	- Tools: k6 / Artillery / JMeter
- Security Testing:
	- OWASP Top 10 checklist: SQL injection, XSS, CSRF, broken auth, etc\.
	- Cross\-tenant access test: automated tests verify no tenant can access another's data
	- API authorization matrix test: for every endpoint × every role, verify correct allow/deny
	- Input validation: test all form inputs with malicious data \(SQL injection strings, XSS payloads, oversized inputs\)
	- File upload: test with malicious files \(executables disguised as images, oversized files, zip bombs\)

## <a id="_zx5hngzyec5"></a>__SECTION 16: ANALYTICS & REPORTING ENGINE__

### <a id="_einfj0hf58rd"></a>__16\.1 Report Generation Framework__

- Report Architecture:
	- Reports defined as templates: each template specifies data sources, filters, layout, format
	- Data sourced from read\-replica database \(to avoid impacting production\)
	- Heavy reports \(>10,000 rows, multi\-table joins\) run as background jobs \(Bull Queue\)
	- Output formats: PDF \(for formal reports\), Excel/CSV \(for data analysis\), Google Sheets \(Phase 2\)
	- Report caching: generated report stored in S3, cached for 24 hours \(regenerate if data changed\)
- Report Access Control:
	- Each report template has role\-based visibility
	- CEO can generate all reports
	- Admin can generate all reports \+ customize templates
	- Moderator can generate only their own performance reports
	- Farmer can generate only their own report card
	- Platform Admin can generate cross\-FPO analytics reports

### <a id="_qnaf6tdv3kvv"></a>__16\.2 Pre\-Built Report Catalog__

__\#__

__Report Name__

__Primary Audience__

__Frequency__

__Key Data__

1

Farmer Master List

NABARD, Banks

On\-demand

All farmer demographics, KYC status, land, crop, share capital

2

Season Summary Report

Board, NABARD

End of season

Crop coverage, input distribution, yield, revenue, farmer engagement

3

Financial Summary

Board, CA, NABARD

Monthly/Quarterly

Income, expense, receivables, payables, bank balance

4

NABARD MIS Report

NABARD

Quarterly

Pre\-formatted per NABARD template \(see Section 10\.7\)

5

Share Capital Statement

ROC, Board

Annual

Shareholding pattern, transfers, dividends, calls in arrears

6

Moderator Performance

CEO, Admin

Monthly

Visits, tasks, collections, advisory, score per moderator

7

Inventory Report

Admin, Auditor

Monthly

Stock movement, current balance, valuation, wastage, expiry

8

Compliance Status

Board, Auditor

On\-demand

All compliance items with status, overdue items, next deadlines

9

Farmer Report Card

Farmer, Bank

Per farmer

Individual farmer's complete history with FPO

10

Buyer/Supplier Statement

Buyer/Supplier

On\-demand

Transaction history, outstanding amounts

11

Overdue Report

CEO, Board

Weekly

All overdue amounts, age bucket analysis, farmer list

12

Crop Wise Analysis

CEO, NABARD

Season\-end

Area, production, yield, input usage per crop

13

Grant Utilization Report

SFAC, NABARD

As required

Grant\-wise expenditure, budget vs actual, pending UC

14

AI Analysis Summary

CEO, Board

Monthly

Scans performed, diseases detected, advisory compliance

15

Communication Report

Admin

Monthly

SMS/WhatsApp/IVR sent, delivery rates, costs

### <a id="_2kbwslnhtxd5"></a>__16\.3 Custom Report Builder \(Admin Only — Phase 2\)__

- Drag\-and\-Drop Report Builder:
	- Select data source \(Farmers / Orders / Payments / Inventory / Visits\)
	- Select columns \(from available fields\)
	- Apply filters \(same filter options as list views\)
	- Select grouping \(e\.g\., group by village, group by crop\)
	- Select aggregations \(sum, count, average, min, max\)
	- Choose format: table / chart \(bar, line, pie\)
	- Preview report
	- Save as template \(reusable\)
	- Schedule: run automatically \(daily/weekly/monthly\) and email to configured recipients

## <a id="_lt8l5kiaj0zh"></a>__SECTION 17: LOCALIZATION & LANGUAGE__

### <a id="_2edhdt8b9u1r"></a>__17\.1 Supported Languages__

__Language__

__Script__

__Code__

__Status__

Hindi

Devanagari

hi

Phase 1

English

Latin

en

Phase 1

Marathi

Devanagari

mr

Phase 1

Telugu

Telugu

te

Phase 1

Tamil

Tamil

ta

Phase 1

Kannada

Kannada

kn

Phase 2

Gujarati

Gujarati

gu

Phase 2

Bengali

Bengali

bn

Phase 2

Odia

Odia

or

Phase 2

Punjabi

Gurmukhi

pa

Phase 2

### <a id="_w0itr2agclwk"></a>__17\.2 Localization Architecture__

- Translation Management:
	- All UI strings externalized into translation files \(JSON format per language\)
	- Key\-based system: "farmer\.list\.title" → "किसान सूची" \(Hindi\) / "Farmer List" \(English\)
	- Dynamic content \(farmer names, product names, village names\) displayed as entered — not translated
	- Numbers formatted per locale \(₹1,23,456 in Indian format — not ₹123,456\)
	- Dates formatted per locale \(15 जनवरी 2025 in Hindi / 15 January 2025 in English\)
- Translation Workflow:
	- English as source language — all strings written in English first
	- Professional translation for each supported language \(not machine translation for primary UI\)
	- Machine translation \(Google Translate API\) used as fallback for dynamic advisory content where professional translation is not feasible
	- Translation review by native speakers before release
	- Crowdsource corrections: if a user reports a translation issue, it's flagged for review
- Language Selection:
	- Farmer App: set during first login, changeable in profile
	- Web App \(CEO/Admin\): set during first login or via profile dropdown
	- Moderator App: set during first login, changeable in settings
	- Language preference stored in user profile, applied across all sessions and devices
	- API responses include localized strings based on Accept\-Language header or user preference
- Special Considerations:
	- Voice advisory \(IVR, text\-to\-speech\): each language requires separate voice recordings or TTS engine support
	- WhatsApp templates: must be submitted for approval in each language separately
	- SMS: Unicode messages \(Hindi\) consume 70 characters per segment vs 160 for English — cost consideration
	- PDF reports: generated in the requesting user's language; multi\-language PDF support via Unicode fonts \(Noto Sans family\)
	- Search: Hindi typed in Devanagari AND transliterated \(e\.g\., "raju" should find "राजू"\)

## <a id="_frqoc0z91bms"></a>__SECTION 18: MOBILE APP SPECIFICATIONS__

### <a id="_idi0c99lsuix"></a>__18\.1 Moderator App \(React Native\)__

- Target Devices:
	- Android 8\.0 \(Oreo\) and above
	- Minimum RAM: 2 GB
	- Minimum storage: 100 MB for app \+ 500 MB for offline data cache
	- iOS version: Phase 2 \(most field coordinators use Android\)
- App Size:
	- APK download: < 25 MB \(critical for low\-bandwidth areas\)
	- AI model download: additional 12 MB \(downloaded post\-install on Wi\-Fi\)
- Offline Data Budget:
	- Farmer profiles \(own cluster\): ~500 KB for 100 farmers
	- Crop schedules: ~200 KB
	- Task queue \(7 days\): ~100 KB
	- Product catalog: ~50 KB
	- Visit log cache: ~1 MB \(including compressed photos\)
	- Total offline data: < 50 MB for typical moderator
- Battery Optimization:
	- GPS capture only during active operations \(visit log, attendance\) — not continuous tracking
	- Background sync: every 15 minutes when app is open; hourly when in background
	- No persistent background service \(to avoid battery drain and Android killing the process\)
- Update Strategy:
	- Force update: if major version changes \(breaking API changes\), app shows "Update required" screen
	- Soft update: for minor versions, user sees "Update available" banner — can dismiss for 7 days
	- Delta updates \(if using CodePush for React Native\): only changed bundles downloaded, not full APK

### <a id="_wvoxgaslf2hw"></a>__18\.2 Farmer App \(React Native — Separate App\)__

- Target Devices:
	- Android 6\.0 \(Marshmallow\) and above — wider compatibility for older devices
	- Minimum RAM: 1 GB
	- Minimum storage: 50 MB for app \+ 100 MB for data
- App Size:
	- APK download: < 15 MB \(absolute priority — farmers won't download large apps\)
	- AI model \(if Plant Saathi enabled\): additional 12 MB \(optional download\)
- Performance Targets on Low\-End Devices:
	- App launch to home screen: < 3 seconds
	- Screen transitions: < 500ms
	- Photo capture to preview: < 2 seconds
	- OTP screen load: < 1 second
- Data Usage:
	- Monthly data consumption: < 50 MB for typical farmer usage \(daily check, weekly advisory\)
	- Images compressed before upload \(max 500 KB per photo\)
	- API responses minimized \(only essential fields, no nested objects for farmer endpoints\)
- Crash Handling:
	- Crash reporting: Sentry or Firebase Crashlytics
	- If app crashes: auto\-restart to home screen
	- Crash\-free session rate target: > 99\.5%
	- If persistent crash: show offline fallback screen with helpline number

## <a id="_pvrkadtvnend"></a>__SECTION 19: ONBOARDING & TRAINING__

### <a id="_8w7v7hx8eqoc"></a>__19\.1 FPO Onboarding Process__

- Step 1: Commercial Agreement \(Offline\)
	- K2 sales team engages with FPO
	- Subscription plan selected
	- Agreement signed \(digital or physical\)
	- Payment received \(first month/quarter/year\)
- Step 2: Platform Admin Creates FPO \(Section 1\.3\)
	- FPO identity, CEO setup, configuration, document upload
	- Tenant provisioned automatically
- Step 3: Configuration Call \(K2 Onboarding Team \+ CEO \+ Admin\)
	- 60\-minute video/phone call
	- Walk through: season setup, crop configuration, cluster definition, module selection
	- Admin fills in: village master, crop master, product master, supplier list
	- Upload existing farmer data \(bulk CSV import\)
- Step 4: Training \(Remote or On\-Site\)

__Session__

__Audience__

__Duration__

__Mode__

__Content__

CEO Overview

CEO

90 min

Video call

Dashboard, Decision Feed, Reports, Analytics, Credit Score

Admin Operations

Admin \(1–2\)

3 hours

Video call \+ screen share

Farmer CRUD, Orders, Inventory, Payments, Documents, Settings

Moderator Field Training

All Moderators

2 hours

On\-site \(or video\)

App walkthrough, Visit log, Payment collection, Advisory, Offline mode

Farmer App Demo

CEO \+ Moderator

30 min

Video

How to onboard farmers, show farmers the app features

- Step 5: Pilot Period \(2 Weeks\)
	- FPO uses platform with real data
	- K2 support available via dedicated WhatsApp group
	- Daily check\-in \(first week\), alternate\-day \(second week\)
	- Issues tracked and resolved in real\-time
- Step 6: Go\-Live
	- Pilot review call
	- Any final configuration adjustments
	- FPO transitions to standard support

### <a id="_cpysmhw7gwf9"></a>__19\.2 In\-App Help & Guidance__

- Contextual Help:
	- Every screen has a \(?\) icon in the header — taps opens help panel
	- Help panel shows: what this screen does, common actions, tips
	- Written in simple language, in user's selected language
- Guided Tours:
	- First\-time user on CEO dashboard: interactive walkthrough pointing to each section
	- First\-time Admin creating a farmer: step\-by\-step tooltip guidance
	- First\-time Moderator logging a visit: animated guide
	- Tours can be replayed from Settings → Help → Show Guided Tour
- Video Tutorials:
	- Library of 1–3 minute tutorial videos for each module
	- Available in Hindi and English \(regional languages Phase 2\)
	- Accessible from Help menu
	- Videos hosted on CDN \(not YouTube — to avoid distracting content\)
- FAQ / Knowledge Base:
	- Searchable FAQ within the app/web platform
	- Managed by Platform Admin \(Section 1\.5\)
	- Auto\-suggest: when user searches for help, relevant FAQ articles shown

## <a id="_7lusn6vpuxxr"></a>__SECTION 20: PHASED DELIVERY ROADMAP__

### <a id="_glqkiumiqg1m"></a>__Phase 1: Foundation \(Months 1–4\)__

- Goal: Core platform usable by an FPO for farmer management and input operations
- Deliverables:
	- Platform Admin: FPO onboarding, subscription management, system monitoring
	- CEO Dashboard: KPIs, Decision Feed \(basic alerts\), Farmer module \(read\-only\)
	- Admin: Farmer CRUD \(individual \+ bulk import\), Share capital, Crop management, Cluster management, Settings
	- Admin: Input order lifecycle \(demand → PO → GRN → distribution → invoice\)
	- Admin: Payment recording \(single \+ bulk\), Farmer ledger, Overdue tracking
	- Admin: Document vault \(upload, categorize, expiry tracking\)
	- Moderator App: Farmer list, Visit log, Payment collection, Task queue, Offline mode
	- Farmer App: Home screen, Account view, Crop calendar, Notifications, Order request
	- Authentication: OTP\-based login for all roles
	- Multi\-language: Hindi \+ English
	- Basic notifications: App push \+ SMS
- Technical:
	- PostgreSQL database with tenant isolation
	- REST API with role\-based access
	- React web app \(CEO \+ Admin\)
	- React Native mobile apps \(Moderator \+ Farmer\)
	- Redis caching \+ Bull Queue
	- S3 file storage
	- Basic deployment pipeline \(staging \+ production\)

### <a id="_zdcil6dfjzqz"></a>__Phase 2: Intelligence & Finance \(Months 5–8\)__

- Goal: Add financial depth, market intelligence, AI, and communication channels
- Deliverables:
	- CEO: Full financial module \(four quadrant view, receivables, payables, cash flow forecast\)
	- CEO: Full analytics module \(all 15 graph types\)
	- CEO: Credit score breakdown
	- Admin: Supplier management, Buyer management, Buyer contracts
	- Admin: Inventory module \(full stock management, expiry, reorder\)
	- Admin: Banking integration \(transaction entry, reconciliation\)
	- Admin: HR module \(staff, attendance, tasks, salary, performance\)
	- Admin: Billing module enhancements \(UPI payment links, bulk reconciliation\)
	- Plant Saathi AI: Disease identification \(10 crops\), Advisory engine, basic yield prediction
	- Mandi Price module: price dashboard, alerts, historical trends
	- WhatsApp Business integration
	- IVR module: outbound calls, inbound menu
	- Additional languages: Marathi, Telugu, Tamil
	- Reports: NABARD MIS, Season summary, Financial summary, Farmer report card
- Technical:
	- AI model training and deployment \(TensorFlow\)
	- Weather API integration
	- Agmarknet/eNAM integration
	- WhatsApp Business API setup
	- IVR provider integration
	- Read replica for reporting queries
	- Performance optimization \(caching, query optimization\)

### <a id="_p56hfpmomxc6"></a>__Phase 3: Compliance & Scale \(Months 9–12\)__

- Goal: Full compliance management, advanced analytics, and scale readiness
- Deliverables:
	- Compliance module: full calendar, board meeting management, AGM workflow, audit tracking
	- NABARD MIS auto\-generator \(fully populated from data\)
	- Grant & scheme compliance tracking, utilization certificate generation
	- CEO: Farmer churn prediction, disease risk prediction, market price prediction
	- Plant Saathi chatbot \(conversational AI\)
	- Custom report builder \(Admin\)
	- Advanced search \(Elasticsearch/Meilisearch\)
	- Farmer App: Plant Saathi photo scan, voice\-based problem reporting
	- Additional languages: Kannada, Gujarati, Bengali
	- Platform Admin: revenue analytics, churn tracking, cross\-FPO benchmarking
	- Output/sales pipeline management \(produce aggregation, buyer matching, dispatch tracking\)
	- Payment gateway integration \(auto\-reconciliation from UPI payments\)
- Technical:
	- Elasticsearch deployment
	- LLM integration for chatbot \(RAG\-based\)
	- Advanced ML models \(churn, yield, price prediction\)
	- Horizontal scaling configuration \(auto\-scaling groups\)
	- Disaster recovery testing
	- Security audit \(third\-party penetration testing\)

### <a id="_ebu95735g5xe"></a>__Phase 4: Ecosystem & Growth \(Months 13–18\)__

- Goal: Expand capabilities, integrations, and FPO network effects
- Deliverables:
	- Inter\-FPO marketplace: FPO\-to\-FPO trading for bulk procurement
	- Government scheme API integrations \(PM\-KISAN status, Soil Health Card, KCC\)
	- Aadhaar e\-KYC integration
	- Farmer credit scoring \(for KCC applications, micro\-lending partnerships\)
	- Custom hiring module \(tractor, sprayer, harvester booking and tracking\)
	- Processing/value addition tracking \(if FPO does milling, grading, packaging\)
	- FPO federation support \(multiple FPOs under one umbrella organization\)
	- API for third\-party integrations \(banks, insurance companies, input companies\)
	- Additional languages: Odia, Punjabi
	- iOS apps \(Moderator \+ Farmer\)
	- Progressive Web App \(PWA\) for farmer app \(for ultra\-low\-storage devices\)
	- White\-labeling: FPO's own branding on apps and reports
	- Advanced benchmarking: FPO's performance vs peer FPOs \(anonymized\)

## <a id="_zh3bhuac7y6n"></a>__SECTION 21: SUCCESS METRICS & KPIs__

### <a id="_amd2zcd8bhd7"></a>__21\.1 Platform Health Metrics \(K2 Internal\)__

__Metric__

__Target__

__Measurement__

FPO Onboarding Rate

20 new FPOs/month \(Year 1\)

Count of new FPOs created

FPO Retention Rate

> 90% annual

FPOs renewing subscription

Monthly Active FPOs

> 85% of total onboarded

FPOs with at least 1 login in 30 days

Platform Uptime

99\.9%

Automated monitoring

API Error Rate

< 0\.1%

5xx responses / total requests

Support Ticket Resolution Time

< 24 hours \(average\)

Ticket system metrics

NPS \(Net Promoter Score\)

> 40

Quarterly survey to CEO/Admin

### <a id="_ct91c6w6whnj"></a>__21\.2 FPO Health Metrics \(Per FPO\)__

__Metric__

__Target__

__Significance__

Farmer Activation Rate

> 70% of registered farmers active in season

Measures FPO's engagement reach

Input Order Fulfillment Rate

> 90% within promised timeline

Operational efficiency

Payment Collection Rate

> 85% within 30 days of invoice

Financial health

Moderator Visit Coverage

> 80% of farmers visited per month

Field operation quality

Advisory Delivery Rate

> 90% of scheduled advisories sent

Farmer service quality

Compliance Score

> 80/100

Governance maturity

Revenue Growth

> 15% year\-over\-year

Business sustainability

Farmer Retention \(Season\-over\-Season\)

> 75%

Long\-term viability

AI Scan Accuracy \(User\-Reported\)

> 85% correct identification

AI model quality

Data Completeness

> 90% of farmer profiles fully filled

Data quality

## <a id="_v2b35p6xyfye"></a>__SECTION 22: GLOSSARY__

__Term__

__Definition__

FPO

Farmer Producer Organization — a legal entity \(Producer Company\) formed by farmers for collective benefit

FPC

Farmer Producer Company — legal name; FPO and FPC are used interchangeably

CEO

Chief Executive Officer of the FPO \(often called Managing Director in smaller FPOs\)

Moderator

Field coordinator employed by the FPO to work directly with farmers in assigned clusters

Cluster

A geographic grouping of villages assigned to one moderator

Kharif

Summer cropping season \(June–October\) — rice, maize, soybean, cotton

Rabi

Winter cropping season \(November–March\) — wheat, mustard, chickpea, potato

Zaid

Short summer season \(March–June\) — vegetables, watermelon, cucumber

Mandi

Agricultural market \(regulated marketplace for commodity trading\)

MSP

Minimum Support Price — government\-guaranteed price for certain crops

NABARD

National Bank for Agriculture and Rural Development — key government body for FPO support

SFAC

Small Farmers' Agri\-Business Consortium — implements FPO promotion schemes

MIS

Management Information System — periodic reporting format required by NABARD

KYC

Know Your Customer — identity verification documents

PO

Purchase Order

GRN

Goods Receipt Note — document confirming receipt of goods at warehouse

ROC

Registrar of Companies — corporate filings authority

MoA

Memorandum of Association — FPO's charter document

AoA

Articles of Association — FPO's internal rules

AGM

Annual General Meeting — statutory meeting of all FPO members

UC

Utilization Certificate — document proving grant money was spent as intended

KCC

Kisan Credit Card — agricultural credit facility for farmers

eNAM

Electronic National Agriculture Market — online trading platform for agricultural commodities

ICAR

Indian Council of Agricultural Research

SAU

State Agricultural University

CIBRC

Central Insecticides Board & Registration Committee

DLT

Distributed Ledger Technology \(in SMS context\) — TRAI's telecom regulatory platform for commercial messaging

RLS

Row\-Level Security — PostgreSQL feature for tenant data isolation

RBAC

Role\-Based Access Control

RAG

Retrieval\-Augmented Generation — AI technique combining search with language models

IVR

Interactive Voice Response — automated phone system

TTL

Time To Live — duration for which cached data is valid

RPO

Recovery Point Objective — maximum acceptable data loss in disaster

RTO

Recovery Time Objective — maximum acceptable downtime in disaster

APM

Application Performance Monitoring

- *End of K2 FPO Management Platform — Complete Product Specification*
- *Version: 1\.0  
Last Updated: \[Date\]  
Classification: Confidential — K2 Internal*

