# Dead by Daylight Tournament Ban Veto System

## Overview

A real-time tournament ban management system for Dead by Daylight esports events. The application provides a dual-interface design: a streaming-optimized display view for viewers and a controller panel for tournament organizers. The system enables live banning of killer perks, survivor perks, maps, and killers during tournament matches with instant synchronization across all connected clients.

**Purpose**: Streamline the ban/veto phase of Dead by Daylight tournaments with a professional, broadcast-ready interface that maintains the game's dark horror aesthetic while ensuring high visual clarity for streaming platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library. The application follows a multi-page structure with distinct routes for:
- Menu/Home page (`/`)
- Display views for each category (survivor perks, killer perks, maps, killers)
- Controller panel (`/control`)

**UI Component Strategy**: Built on shadcn/ui component library (Radix UI primitives) with heavy customization for the Dead by Daylight theme. The design system uses:
- Dark mode with custom HSL color variables for theming
- Tailwind CSS with extended configuration for custom colors, borders, and shadows
- Custom hover/active elevation states via utility classes
- Typography system using Inter (UI) and Rajdhani (display/headers) fonts from Google Fonts

**State Management**: Real-time state synchronization via WebSocket connection. Local component state is used for UI interactions, with WebSocket providing the source of truth for ban state across all clients.

**Design Rationale**: The dual-view approach (display vs controller) allows tournament organizers to manage bans from a control panel while viewers see a clean, distraction-free display. This separation ensures the streaming experience remains professional while providing full control capabilities to administrators.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Real-time Communication**: WebSocket server (using the `ws` library) mounted at `/ws` endpoint. All ban state changes are broadcast to connected clients instantly, ensuring synchronized views across display screens and controller interfaces.

**Data Storage**: In-memory storage implementation (`MemStorage` class) that maintains:
- User data (with UUID-based IDs)
- Current ban state (arrays of banned items per category)

The storage layer is abstracted through an `IStorage` interface, allowing for future database integration without changing business logic.

**Session Management**: Uses `connect-pg-simple` for PostgreSQL-backed session storage (when database is configured).

**Pros of Current Approach**:
- WebSocket ensures zero-latency updates for tournament environments
- In-memory storage provides instant reads/writes for real-time operations
- Abstracted storage interface enables easy migration to persistent database

**Cons/Trade-offs**:
- In-memory storage loses state on server restart (acceptable for live tournament use cases)
- No authentication/authorization currently implemented (suitable for controlled tournament environments)

### Data Storage Solutions

**Database Schema** (Drizzle ORM with PostgreSQL):
- Configured to use PostgreSQL via `@neondatabase/serverless` driver
- Schema defines a `users` table with UUID primary keys, username, and password fields
- Database migrations stored in `./migrations` directory

**Current State**: The application is set up for PostgreSQL but uses in-memory storage by default. The database schema exists for user management but ban state is intentionally kept in-memory for performance during live tournaments.

**Rationale**: Tournament ban states are ephemeral - they only need to persist for the duration of a match. In-memory storage eliminates database latency while WebSocket ensures all clients stay synchronized. User data would be persisted to PostgreSQL for authentication in production.

### External Dependencies

**UI Framework & Components**:
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled component primitives
- Tailwind CSS - Utility-first styling with custom theme configuration
- shadcn/ui design system - Pre-built component patterns customized for DBD theme
- class-variance-authority & clsx - Dynamic className composition
- Lucide React - Icon library

**State & Data Management**:
- TanStack Query (@tanstack/react-query) - Server state management and caching
- React Hook Form - Form state management
- Zod - Runtime type validation and schema definitions
- drizzle-zod - Zod schema generation from Drizzle ORM types

**Database & ORM**:
- Drizzle ORM - Type-safe SQL query builder
- @neondatabase/serverless - Serverless PostgreSQL driver
- connect-pg-simple - PostgreSQL session store for Express

**Real-time Communication**:
- ws (WebSocket) - WebSocket server and client implementation
- Custom WebSocket hook (`useWebSocket`) for React integration

**Build & Development Tools**:
- Vite - Fast development server and build tool
- esbuild - JavaScript bundler for production builds
- TypeScript - Type safety across frontend and backend
- Replit-specific plugins for development environment integration

**Design Resources**:
- Google Fonts (Inter, Rajdhani) - Typography system
- Custom CSS variables for Dead by Daylight horror-themed dark mode