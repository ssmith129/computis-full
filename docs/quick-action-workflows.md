# Dashboard Quick Action Workflows

## Overview
This document outlines the complete user workflows for each quick action available on the Computis dashboard. Each workflow is designed to be intuitive, efficient, and accessible.

---

## 1. Import Transactions Workflow

### **Action Name:** Import Transactions

### **Workflow Diagram:**
```
Dashboard → Click "Import" → Choose Source → Upload File → Map Columns → Review Data → Complete Import
     ↓              ↓              ↓              ↓              ↓              ↓
  Quick Action  → Source Selection → File Upload → Column Mapping → Data Preview → Success State
```

### **Page Structure & Components:**

#### **Step 1: Source Selection**
- **Layout:** Full-screen overlay with centered content container (max-width: 1200px)
- **Header:** Progress indicator (4 steps), back button, workflow title
- **Main Content:** 
  - Hero section with statistics (50+ platforms, 10M+ transactions, 99.9% accuracy)
  - Search/filter bar for source platforms
  - Category tabs: "Popular", "Exchanges", "Wallets", "Files"
  - Grid of source cards (responsive: 1-2-3-4 columns)
- **Footer:** Navigation buttons (Cancel, Next)

#### **Step 2: File Upload & Validation**
- **Layout:** Split layout - upload area (60%) + guidance sidebar (40%)
- **Upload Zone:** 
  - Drag & drop area with animated hover states
  - File browser button as alternative
  - Multiple file support with individual progress bars
  - Real-time validation indicators
- **Sidebar:**
  - Platform-specific instructions
  - Sample file templates
  - Troubleshooting tips

#### **Step 3: Column Mapping**
- **Layout:** Two-column mapping interface
- **Left Panel:** Detected CSV columns with sample data
- **Right Panel:** Target field mapping dropdowns
- **Features:**
  - Auto-mapping suggestions based on column headers
  - Manual override capabilities
  - Required field indicators
  - Data type validation

#### **Step 4: Data Review & Import**
- **Layout:** Full-width data table with action sidebar
- **Preview Table:** 
  - Paginated data preview (10 rows visible)
  - Error/warning indicators per row
  - Column sorting and filtering
- **Action Panel:**
  - Import summary statistics
  - Error/warning counts
  - Data quality metrics
  - Final import button

### **Interaction Details:**

#### **File Upload Interactions:**
- **Drag Enter:** Border highlight + background color change
- **Drag Over:** Pulsing animation on drop zone
- **File Drop:** Immediate validation + progress bar animation
- **File Validation:**
  - ✓ Valid: Green checkmark + file details
  - ✗ Invalid: Red X + specific error message + retry option

#### **Column Mapping Interactions:**
- **Auto-Detection:** Animated mapping lines from source to target
- **Manual Override:** Dropdown with search functionality
- **Required Fields:** Red asterisk + validation on continue
- **Preview Mode:** Hover on mapping shows sample data transformation

#### **Data Review Interactions:**
- **Error Rows:** Click to see detailed error description + fix suggestions
- **Quality Metrics:** Hover for breakdown tooltips
- **Import Button:** Disabled until all critical errors resolved

### **Validation & Error Handling:**

#### **File Validation Rules:**
- **Size Limit:** 50MB maximum (progress bar shows size)
- **Format Support:** CSV, XLSX, XLS, JSON only
- **Structure:** Must contain required columns (date, amount, asset)

#### **Error Scenarios:**
1. **Invalid File Format:**
   - Error: "Unsupported file format. Please upload CSV, Excel, or JSON files."
   - Action: Show supported formats + template download links

2. **File Too Large:**
   - Error: "File size exceeds 50MB limit. Please split your data or compress the file."
   - Action: Provide compression tips + data splitting guidance

3. **Missing Required Columns:**
   - Error: "Required columns missing: Date, Amount, Asset"
   - Action: Show column mapping interface + manual assignment options

4. **Data Format Issues:**
   - Warning: "23 rows have invalid date formats"
   - Action: Show problematic rows + auto-fix suggestions

### **Success States:**
- **Import Complete:** Animated success checkmark + summary statistics
- **Next Steps:** Quick navigation to "Review Transactions" or "AI Classify"
- **Notifications:** Success notification with import details

### **Navigation:**
- **Back to Dashboard:** Header back button
- **Step Navigation:** Previous/Next buttons + progress indicator clicks
- **Quick Exit:** ESC key support + confirmation dialog

---

## 2. Generate Report Workflow

### **Action Name:** Generate Report

### **Workflow Diagram:**
```
Dashboard → Click "Report" → Select Type → Choose Client → Configure → Review → Generate → Download
     ↓              ↓              ↓              ↓              ↓         ↓          ↓
  Quick Action → Report Templates → Client Selection → Settings → Preview → Processing → Complete
```

### **Page Structure & Components:**

#### **Step 1: Report Template Selection**
- **Layout:** Card-based template gallery with filtering
- **Categories:** "Tax Forms", "Client Reports", "Compliance", "Analytics"
- **Template Cards:**
  - Large icon + template name
  - Description + use case
  - Estimated generation time
  - Complexity indicator (Simple/Standard/Complex)
  - "Required" badge for tax forms

#### **Step 2: Client & Period Selection**
- **Layout:** Form-based interface with client search
- **Client Selector:**
  - Searchable dropdown with client avatars
  - Recent clients quick access
  - "All Clients" option for bulk reports
- **Date Range:**
  - Quick presets (This Year, Last Year, Q1-Q4)
  - Custom date picker
  - Tax year selector

#### **Step 3: Report Configuration**
- **Layout:** Sectioned form with collapsible advanced options
- **Basic Settings:**
  - Report format (PDF, Excel, CSV)
  - Currency selection
  - Timezone preferences
- **Advanced Options:**
  - Accounting method (FIFO, LIFO, etc.)
  - Include/exclude options
  - Rounding preferences
  - Custom fields

#### **Step 4: Preview & Generate**
- **Layout:** Split view - settings summary (30%) + report preview (70%)
- **Settings Summary:** All configured options with edit links
- **Preview:** Mockup of first page with actual data
- **Generation Controls:** Generate button + estimated time

### **Interaction Details:**

#### **Template Selection:**
- **Hover Effects:** Card elevation + shadow animation
- **Selection State:** Yellow border + checkmark overlay
- **Quick Info:** Tooltip on hover with additional details

#### **Client Search:**
- **Autocomplete:** Real-time filtering as user types
- **Recent Activity:** Show last interaction date per client
- **Visual Indicators:** Active/inactive status badges

#### **Configuration Form:**
- **Progressive Disclosure:** Advanced options collapsed by default
- **Smart Defaults:** Pre-populate based on client preferences
- **Real-time Validation:** Immediate feedback on invalid selections

### **Validation & Error Handling:**

#### **Required Field Validation:**
- **Client Selection:** Must select at least one client
- **Date Range:** End date must be after start date
- **Report Type:** Template selection required

#### **Error Scenarios:**
1. **No Data Available:**
   - Error: "No transactions found for selected period"
   - Action: Suggest expanding date range or importing data

2. **Insufficient Data:**
   - Warning: "Limited data may result in incomplete report"
   - Action: Show data gaps + option to proceed anyway

3. **Generation Failure:**
   - Error: "Report generation failed due to server error"
   - Action: Retry button + option to contact support

### **Success States:**
- **Generation Complete:** Download link + report details
- **Auto-Download:** Immediate file download + browser notification
- **Report Library:** Option to view in reports section

---

## 3. Add Client Workflow

### **Action Name:** Add Client

### **Workflow Diagram:**
```
Dashboard → Click "Add Client" → Select Type → Basic Info → Tax Details → Confirm → Welcome
     ↓              ↓                  ↓             ↓             ↓          ↓         ↓
  Quick Action → Individual/Business → Contact Form → Tax Setup → Review → Creation → Next Steps
```

### **Page Structure & Components:**

#### **Step 1: Client Type Selection**
- **Layout:** Two-column choice with detailed comparison
- **Options:**
  - Individual: Personal crypto tax client
  - Business: Corporate entity with advanced features
- **Comparison Table:** Feature differences side-by-side
- **Recommendation Engine:** "Most users choose Individual"

#### **Step 2: Basic Information**
- **Layout:** Progressive form with smart field grouping
- **Personal/Business Info:**
  - Name fields (adaptive based on type)
  - Contact information
  - Address (with auto-complete)
- **Form Features:**
  - Real-time validation
  - Auto-formatting (phone numbers, postal codes)
  - Address lookup integration

#### **Step 3: Tax Configuration**
- **Layout:** Sectioned form with educational tooltips
- **Tax Settings:**
  - Tax ID/SSN (masked input)
  - Entity type (for businesses)
  - Accounting method selection
  - Tax year configuration
- **Educational Content:**
  - Tooltips explaining tax concepts
  - Links to help articles
  - Visual guides for complex selections

#### **Step 4: Review & Create**
- **Layout:** Summary card with edit links
- **Review Sections:**
  - Client information summary
  - Tax configuration summary
  - Service preferences
- **Creation Process:**
  - Loading state with progress indicators
  - Success animation
  - Next steps guidance

### **Interaction Details:**

#### **Type Selection:**
- **Cards:** Large, clickable cards with hover states
- **Comparison:** Toggle between cards to see differences
- **Help:** Contextual help for decision making

#### **Form Interactions:**
- **Progressive Enhancement:** Show relevant fields based on selections
- **Smart Validation:** Real-time feedback with helpful messages
- **Auto-Save:** Periodic saving to prevent data loss

#### **Address Input:**
- **Auto-Complete:** Google Places integration
- **Manual Entry:** Option to skip auto-complete
- **Validation:** Postal code format validation by country

### **Validation & Error Handling:**

#### **Form Validation Rules:**
- **Email:** Valid format + uniqueness check
- **Phone:** Format validation by country
- **Tax ID:** Format validation (SSN vs EIN)
- **Required Fields:** Clear indicators + blocking validation

#### **Error Scenarios:**
1. **Duplicate Client:**
   - Error: "A client with this email already exists"
   - Action: Show existing client + option to edit or create new

2. **Invalid Tax ID:**
   - Error: "Invalid Tax ID format for selected country"
   - Action: Show correct format example + format guide

3. **Creation Failure:**
   - Error: "Unable to create client due to system error"
   - Action: Save form data + retry option + support contact

### **Success States:**
- **Client Created:** Success animation + client profile preview
- **Next Steps:** Quick actions for new client (Import Data, Generate Report)
- **Onboarding:** Optional guided tour for new features

---

## 4. Connect Wallet Workflow

### **Action Name:** Connect Wallet

### **Workflow Diagram:**
```
Dashboard → Click "Connect" → Select Wallet → Choose Method → Authenticate → Sync → Complete
     ↓              ↓                 ↓               ↓              ↓         ↓         ↓
  Quick Action → Wallet Gallery → Connection Type → Credentials → Data Sync → Verification → Success
```

### **Page Structure & Components:**

#### **Step 1: Wallet Selection**
- **Layout:** Categorized grid with search functionality
- **Categories:** "Popular", "Exchanges", "Hardware", "Software"
- **Wallet Cards:**
  - Platform logo + name
  - Security rating (1-5 stars)
  - Supported assets count
  - Connection difficulty indicator

#### **Step 2: Connection Method**
- **Layout:** Method comparison with pros/cons
- **Options:**
  - API Connection (real-time sync)
  - Address Import (read-only)
  - CSV Upload (one-time)
- **Method Details:**
  - Security implications
  - Feature limitations
  - Setup difficulty

#### **Step 3: Authentication**
- **Layout:** Secure form with security indicators
- **API Method:**
  - API key input (masked)
  - API secret input (masked)
  - Passphrase (if required)
  - Permissions display
- **Address Method:**
  - Address input with validation
  - QR code scanner option
  - Address book integration

#### **Step 4: Data Synchronization**
- **Layout:** Progress interface with detailed status
- **Sync Process:**
  - Connection testing
  - Transaction discovery
  - Data validation
  - Final import
- **Real-time Updates:**
  - Progress percentage
  - Current operation description
  - Estimated time remaining

### **Interaction Details:**

#### **Wallet Selection:**
- **Search:** Real-time filtering by name or supported assets
- **Categories:** Filter by wallet type
- **Cards:** Hover effects with additional details

#### **Authentication Form:**
- **Security Indicators:** Visual cues for connection security
- **Field Validation:** Real-time API key format checking
- **Help Links:** Platform-specific setup guides

#### **Sync Progress:**
- **Animated Progress:** Ring progress indicator with percentage
- **Status Updates:** Real-time status messages
- **Cancellation:** Option to cancel during sync

### **Validation & Error Handling:**

#### **Connection Validation:**
- **API Key Format:** Platform-specific validation
- **Address Format:** Blockchain-specific address validation
- **Permission Check:** Verify API permissions before proceeding

#### **Error Scenarios:**
1. **Invalid Credentials:**
   - Error: "Invalid API credentials. Please check your API key and secret."
   - Action: Link to platform-specific credential generation guide

2. **Insufficient Permissions:**
   - Error: "API key lacks required read permissions"
   - Action: Show required permissions + setup guide

3. **Connection Timeout:**
   - Error: "Unable to connect to wallet. Please check your internet connection."
   - Action: Retry button + troubleshooting tips

4. **Sync Failure:**
   - Error: "Data sync interrupted. Partial data imported."
   - Action: Resume sync option + manual retry

### **Success States:**
- **Connection Established:** Green checkmark + connection details
- **Sync Complete:** Transaction count + portfolio value summary
- **Auto-Setup:** Automatic classification rules based on wallet type
- **Next Steps:** Links to transaction review or AI classification

### **Navigation:**
- **Step Progression:** Linear flow with ability to go back
- **Quick Exit:** Confirmation dialog for unsaved progress
- **Help System:** Contextual help for each step

---

## Cross-Workflow Design Patterns

### **Consistent UI Elements:**
1. **Progress Indicators:** 4-step circular progress with connecting lines
2. **Action Buttons:** Primary (yellow), secondary (white), danger (red)
3. **Form Validation:** Inline validation with clear error messages
4. **Loading States:** Consistent spinner + progress animations
5. **Success States:** Checkmark animations + next step guidance

### **Accessibility Features:**
1. **Keyboard Navigation:** Tab order + focus indicators
2. **Screen Reader Support:** ARIA labels + descriptions
3. **Color Independence:** Icons + text for all status indicators
4. **High Contrast:** WCAG 2.1 AA compliant color ratios

### **Mobile Responsiveness:**
1. **Adaptive Layouts:** Stack columns on mobile
2. **Touch Targets:** Minimum 44px touch areas
3. **Simplified Navigation:** Collapse complex layouts
4. **Gesture Support:** Swipe navigation where appropriate

### **Performance Considerations:**
1. **Lazy Loading:** Load workflow components on demand
2. **Progressive Enhancement:** Core functionality without JS
3. **Optimistic Updates:** Immediate UI feedback
4. **Background Processing:** Non-blocking operations

---

## Implementation Notes

### **State Management:**
- Each workflow maintains its own state
- Auto-save drafts every 30 seconds
- Resume capability for interrupted workflows

### **Analytics Tracking:**
- Step completion rates
- Drop-off points identification
- Time-to-completion metrics
- Error frequency analysis

### **Integration Points:**
- **Dashboard:** Seamless transition from quick actions
- **Main Navigation:** Alternative entry points from sidebar
- **Notifications:** Progress updates + completion alerts
- **Help System:** Contextual assistance throughout workflows

This comprehensive workflow design ensures each quick action provides a smooth, intuitive user experience while maintaining consistency across the application.