# Project Structure

## Root Directory

```
├── src/                    # Source code
├── public/                 # Static assets
├── netlify/               # Netlify functions
├── supabase/              # Supabase configuration
├── .kiro/                 # Kiro IDE configuration
└── dist/                  # Build output (generated)
```

## Source Organization (`src/`)

```
src/
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── common/           # Shared components
│   ├── home/             # Home page components
│   ├── blog/             # Blog-related components
│   ├── contact/          # Contact form components
│   └── youtube/          # YouTube integration components
├── pages/                # Page components (routes)
│   └── articles/         # Article-specific pages
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   └── models/           # Data models
├── services/             # API services
├── scripts/              # Utility scripts
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Key Conventions

### Component Organization
- **UI Components**: Located in `src/components/ui/` (shadcn/ui)
- **Feature Components**: Organized by feature/page in `src/components/`
- **Page Components**: Direct route components in `src/pages/`
- **Layout Components**: Shared layouts in `src/components/layout/`

### Import Aliases
- `@/` maps to `src/` directory
- `@/components` for components
- `@/lib` for utilities
- `@/hooks` for custom hooks

### Styling Approach
- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Custom properties for theming
- **Component Classes**: Defined in `@layer components`
- **Brand Colors**: `brandBlue` (#4a52a3) and `brandTeal` (#4aaba3)

### File Naming
- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Pages**: PascalCase (e.g., `About.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Hooks**: camelCase with `use-` prefix (e.g., `use-mobile.tsx`)

### Multi-language Support
- RTL (Right-to-Left) support for Hebrew
- CSS classes with `.rtl` prefix for RTL-specific styles
- Navigation and layout adjustments for RTL languages