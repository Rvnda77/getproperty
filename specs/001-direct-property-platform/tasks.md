# Tasks: Direct Property Platform

**Input**: Design documents from `/specs/001-direct-property-platform/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included as required by constitution testing standards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/` for server code
- **Frontend**: `frontend/src/` for client code
- **Shared**: `shared/` for common utilities

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend directory structure per implementation plan
- [X] T002 Create frontend directory structure per implementation plan
- [X] T003 [P] Install backend dependencies (Express, MongoDB, Socket.io, Firebase) in backend/package.json
- [X] T004 [P] Install frontend dependencies (React, Redux Toolkit, Tailwind CSS) in frontend/package.json
- [X] T005 [P] Set up ESLint and Prettier configuration in both projects
- [X] T006 Create environment configuration files (.env) for backend and frontend
- [X] T007 Set up development scripts (dev, build, test) in both package.json files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Set up MongoDB connection and database configuration in backend/src/config/database.js
- [X] T009 [P] Configure Firebase Admin SDK for server-side authentication in backend/src/config/firebase.js
- [X] T010 [P] Set up Google Maps API configuration in backend/src/config/maps.js
- [X] T011 Create base User model with authentication fields in backend/src/models/User.js
- [X] T012 Implement JWT authentication middleware in backend/src/middleware/auth.js
- [X] T013 Set up Express server with CORS, JSON parsing, and error handling in backend/src/app.js
- [X] T014 Create base API response utilities and error classes in backend/src/utils/
- [X] T015 Set up Socket.io server configuration for real-time features in backend/src/config/socket.js
- [X] T016 Configure Redux store and basic state management in frontend/src/store/
- [X] T017 Set up React Router for frontend navigation in frontend/src/App.js
- [X] T018 Create base API client for frontend-backend communication in frontend/src/services/api.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Owner Posts Property Listing (Priority: P1) 🎯 MVP

**Goal**: Enable property owners to create and publish property listings with full details

**Independent Test**: Owner can create property listing through UI, listing appears in database and can be retrieved via API

### Tests for User Story 1 ⚠️

- [ ] T019 [P] [US1] Contract test for POST /api/properties in backend/tests/contract/test-properties-api.js
- [ ] T020 [P] [US1] Integration test for property creation workflow in backend/tests/integration/test-property-creation.js
- [ ] T021 [P] [US1] Frontend component test for property form in frontend/tests/unit/components/PropertyForm.test.js

### Implementation for User Story 1

- [ ] T022 [P] [US1] Create Property model with all fields from data-model.md in backend/src/models/Property.js
- [X] T023 [P] [US1] Create property validation schema using Joi in backend/src/validations/property.js
- [ ] T024 [US1] Implement property service with CRUD operations in backend/src/services/propertyService.js
- [ ] T025 [US1] Create properties API routes (POST, PUT, DELETE) in backend/src/routes/properties.js
- [ ] T026 [US1] Add property photo upload handling with cloud storage in backend/src/services/fileService.js
- [ ] T027 [US1] Implement Google Maps geocoding for property addresses in backend/src/services/mapsService.js
- [X] T028 [US1] Create property listing form component in frontend/src/components/PropertyForm.js
- [X] T029 [US1] Create property listing page with form integration in frontend/src/pages/CreateProperty.js
- [ ] T030 [US1] Add property form to Redux state management in frontend/src/store/slices/propertySlice.js
- [ ] T031 [US1] Implement mobile-first property form validation, progressive upload flow, and error handling in frontend/src/components/PropertyForm.js
- [ ] T032 [US1] Add property creation success/error notifications in frontend/src/components/PropertyForm.js

**Checkpoint**: At this point, User Story 1 should be fully functional - owners can create property listings

---

## Phase 4: User Story 2 - Tenant Searches and Filters Properties (Priority: P1)

**Goal**: Enable tenants to search and filter available properties by various criteria

**Independent Test**: Tenant can search properties by city/budget/type, results display correctly with applied filters

### Tests for User Story 2 ⚠️

- [ ] T033 [P] [US2] Contract test for GET /api/properties search in backend/tests/contract/test-properties-search.js
- [ ] T034 [P] [US2] Integration test for search and filter functionality in backend/tests/integration/test-property-search.js
- [ ] T035 [P] [US2] Frontend component test for search filters in frontend/tests/unit/components/SearchFilters.test.js

### Implementation for User Story 2

- [ ] T036 [US2] Implement property search service with MongoDB aggregation in backend/src/services/searchService.js
- [ ] T037 [US2] Add search and filter query parameters to properties GET route in backend/src/routes/properties.js
- [ ] T038 [US2] Create Search model for saved searches in backend/src/models/Search.js
- [ ] T039 [US2] Implement search criteria saving functionality in backend/src/services/searchService.js
- [ ] T040 [US2] Create search results page component in frontend/src/pages/SearchResults.js
- [ ] T041 [US2] Create responsive search filters component with touch-friendly controls and instant query updates in frontend/src/components/SearchFilters.js
- [ ] T042 [US2] Implement property cards display component with verified badges and rich property metadata in frontend/src/components/PropertyCard.js
- [ ] T043 [US2] Add search state management to Redux store in frontend/src/store/slices/searchSlice.js
- [ ] T044 [US2] Implement pagination for search results in frontend
- [ ] T045 [US2] Add loading states and empty states for search results in frontend

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - MVP ready

---

## Phase 5: User Story 4 - User Authentication and Verification (Priority: P2)

**Goal**: Provide secure user authentication and account verification for owners and tenants

**Independent Test**: Users can sign up, verify email/phone, login, and access authenticated features

### Tests for User Story 4 ⚠️

- [ ] T046 [P] [US4] Contract test for authentication endpoints in backend/tests/contract/test-auth-api.js
- [ ] T047 [P] [US4] Integration test for user registration and login flow in backend/tests/integration/test-auth-flow.js
- [ ] T048 [P] [US4] Frontend component test for login form in frontend/tests/unit/components/LoginForm.test.js

### Implementation for User Story 4

- [ ] T049 [US4] Implement Firebase authentication service in backend/src/services/authService.js
- [ ] T050 [US4] Create authentication API routes (verify, refresh) in backend/src/routes/auth.js
- [ ] T051 [US4] Add user verification logic for email/phone in backend/src/services/userService.js
- [X] T052 [US4] Create login/signup page components in frontend/src/pages/Auth.js
- [ ] T053 [US4] Implement Firebase authentication in frontend with React context in frontend/src/contexts/AuthContext.js
- [ ] T054 [US4] Create protected route component for authenticated pages in frontend/src/components/ProtectedRoute.js
- [ ] T055 [US4] Add authentication state to Redux store in frontend/src/store/slices/authSlice.js
- [ ] T056 [US4] Implement user profile management in frontend/src/pages/Profile.js
- [ ] T057 [US4] Add logout functionality and session management in frontend

**Checkpoint**: Authentication system complete - users can securely access the platform

---

## Phase 6: User Story 3 - Direct Communication Between Owner and Tenant (Priority: P2)

**Goal**: Enable real-time messaging between property owners and interested tenants

**Independent Test**: Users can initiate contact about a property and exchange messages in real-time

### Tests for User Story 3 ⚠️

- [ ] T058 [P] [US3] Contract test for messages API in backend/tests/contract/test-messages-api.js
- [ ] T059 [P] [US3] Integration test for Socket.io messaging in backend/tests/integration/test-realtime-messaging.js
- [ ] T060 [P] [US3] Frontend component test for chat interface in frontend/tests/unit/components/Chat.test.js

### Implementation for User Story 3

- [ ] T061 [P] [US3] Create Message model for chat messages in backend/src/models/Message.js
- [ ] T062 [US3] Implement message service with CRUD operations in backend/src/services/messageService.js
- [ ] T063 [US3] Create messages API routes (GET, POST) in backend/src/routes/messages.js
- [ ] T064 [US3] Set up Socket.io event handlers for real-time messaging in backend/src/services/socketService.js
- [ ] T065 [US3] Implement message permissions (users can only message about their properties) in backend
- [ ] T066 [US3] Create chat interface component in frontend/src/components/Chat.js
- [ ] T067 [US3] Create message list and input components in frontend/src/components/MessageList.js
- [ ] T068 [US3] Implement Socket.io client connection in frontend/src/services/socket.js
- [ ] T069 [US3] Add real-time message updates to Redux store in frontend/src/store/slices/messageSlice.js
- [ ] T070 [US3] Add typing indicators and read receipts in chat interface

**Checkpoint**: Real-time communication enabled - complete direct property transaction workflow

---

## Phase 7: User Story 5 - User Dashboard Management (Priority: P3)

**Goal**: Provide personalized dashboards for managing listings, searches, and activity

**Independent Test**: Users see relevant dashboard content based on their role (owner/tenant) and can manage their data

### Tests for User Story 5 ⚠️

- [ ] T071 [P] [US5] Contract test for users dashboard API in backend/tests/contract/test-users-api.js
- [ ] T072 [P] [US5] Integration test for dashboard data aggregation in backend/tests/integration/test-dashboard.js
- [ ] T073 [P] [US5] Frontend component test for dashboard widgets in frontend/tests/unit/components/Dashboard.test.js

### Implementation for User Story 5

- [ ] T074 [US5] Implement dashboard data aggregation service in backend/src/services/dashboardService.js
- [ ] T075 [US5] Create users API routes for dashboard and profile in backend/src/routes/users.js
- [ ] T076 [US5] Add saved search management to search service in backend/src/services/searchService.js
- [ ] T077 [US5] Create owner dashboard page with listings management in frontend/src/pages/OwnerDashboard.js
- [ ] T078 [US5] Create tenant dashboard page with saved searches in frontend/src/pages/TenantDashboard.js
- [ ] T079 [US5] Implement dashboard widgets components in frontend/src/components/DashboardWidgets.js
- [ ] T080 [US5] Add dashboard state management to Redux store in frontend/src/store/slices/dashboardSlice.js
- [ ] T081 [US5] Implement property listing management (edit/delete) in dashboard
- [ ] T082 [US5] Add activity feed and notifications in dashboard

**Checkpoint**: All user stories complete - full platform functionality available

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T083 [P] Add comprehensive error handling and user-friendly error messages across all endpoints
- [ ] T084 [P] Implement rate limiting and security middleware in backend
- [ ] T085 [P] Add input sanitization and validation across all forms in frontend
- [ ] T086 [P] Optimize database queries and add indexing for performance
- [ ] T087 [P] Add loading states and skeleton screens throughout frontend
- [ ] T088 [P] Implement responsive design improvements for mobile devices
- [ ] T089 [P] Add comprehensive logging and monitoring in backend
- [ ] T090 [P] Create user onboarding flow and help documentation
- [ ] T091 [P] Add end-to-end tests for critical user journeys
- [ ] T092 [P] Performance optimization and Lighthouse score improvements
- [ ] T093 [P] Security audit and vulnerability fixes
- [ ] T094 [P] Update README and deployment documentation
- [ ] T095 [P] Add verified listing badge component and trust-focused property metadata in frontend/src/components/PropertyCard.js
- [ ] T096 [P] Implement mobile-first and tablet breakpoint layout polish in frontend/src/pages/SearchResults.js and frontend/src/pages/CreateProperty.js
- [ ] T097 [P] Add animated transitions and instant filter update feedback in frontend/src/components/SearchFilters.js and frontend/src/components/PropertyCard.js
- [ ] T098 [P] Create property gallery component with carousel support in frontend/src/components/PropertyGallery.js
- [ ] T099 [P] Refine listing microcopy and action labels in frontend/src/components/PropertyForm.js and frontend/src/components/Header.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - Independent but may reference US1 data
- **User Story 4 (P2)**: Can start after Foundational - Required for all authenticated features
- **User Story 3 (P2)**: Can start after Foundational + US4 - Requires authentication
- **User Story 5 (P3)**: Can start after Foundational + US4 - Requires authentication and other features

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD approach per constitution)
- Models before services before endpoints
- Backend implementation before frontend integration
- Core functionality before advanced features

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational completes, US1 and US2 can start in parallel
- US4 can start in parallel with US1/US2
- US3 and US5 can start after US4 is complete
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for POST /api/properties in backend/tests/contract/test-properties-api.js"
Task: "Integration test for property creation workflow in backend/tests/integration/test-property-creation.js"
Task: "Frontend component test for property form in frontend/tests/unit/components/PropertyForm.test.js"

# Launch all models for User Story 1 together:
Task: "Create Property model with all fields from data-model.md in backend/src/models/Property.js"
Task: "Create property validation schema using Joi in backend/src/validations/property.js"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Property Listing)
4. Complete Phase 4: User Story 2 (Search & Discovery)
5. **STOP and VALIDATE**: Test both stories independently - you now have a working MVP!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 + US2 → Test independently → Deploy/Demo (MVP!)
3. Add US4 (Auth) → Test independently → Deploy/Demo
4. Add US3 (Chat) → Test independently → Deploy/Demo
5. Add US5 (Dashboard) → Test independently → Deploy/Demo
6. Add Polish → Final production-ready release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Property Listing)
   - Developer B: User Story 2 (Search & Discovery)
   - Developer C: User Story 4 (Authentication)
3. Once Auth is done:
   - Developer A: User Story 3 (Chat)
   - Developer B: User Story 5 (Dashboard)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies - can be worked on simultaneously
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Constitution requires testing standards - tests included for all stories
- Verify tests fail before implementing (red-green-refactor cycle)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- File paths follow the MERN structure defined in plan.md