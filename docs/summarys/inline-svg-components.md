# Components with Inline SVGs

This document lists all React components in the codebase that still contain inline SVG elements embedded directly in their JSX code.

## Overview

After migrating SVG assets from the `src/assets/svgs/` directory to use URL imports with `<img>` tags, **26 components** still contain inline SVG code that should be converted for consistency and maintainability.

## Background

Previously, the codebase had compatibility issues with SVG-to-React component transformation due to the custom Rolldown-based Vite build. The solution was to:

1. Convert SVG asset imports from `import Component from 'file.svg?react'` to `import Component from 'file.svg?url'`
2. Change JSX usage from `<Component />` to `<img src={Component} alt="description" />`

However, many components still have inline SVG code that should be extracted to separate SVG files and imported using the same URL approach.

## Migration Progress

### ✅ **Completed Components (7/33):**

**Journey Components (7/8):**
- ✅ `src/components/journey/step-one/IndividualBike.tsx` - Electric & regular bike icons
- ✅ `src/components/journey/step-one/BikeSecurity.tsx` - Home, outbuilding & communal security icons
- ✅ `src/components/journey/step-one/OptionalCover.tsx` - Info icon
- ✅ `src/components/journey/step-three/FeatureList_CORE.tsx` - Cross, tick, chevron icons
- ✅ `src/components/journey/step-three/FeatureList_PERFORMANCE.tsx` - Cross, tick, chevron icons (reused existing SVGs)
- ✅ `src/components/journey/step-four/DDGuarantee.tsx` - Direct Debit guarantee logo
- ✅ `src/components/journey/PolicyConfirmation.tsx` - Success confirmation icon

**SVGs Created (12 total):**
- `electric-bike-icon.svg`
- `regular-bike-icon.svg`
- `home-security-icon.svg`
- `outbuilding-security-icon.svg`
- `communal-security-icon.svg`
- `info-icon.svg`
- `cross-icon.svg`
- `tick-icon.svg`
- `chevron-down-icon.svg`
- `chevron-up-icon.svg`
- `dd-guarantee-icon.svg`
- `policy-confirmation-success-icon.svg`

## Components Requiring Migration

### Shared Components (8 files)
- `src/components/shared/Footer.tsx`
- `src/components/shared/Breadcrumbs.tsx`
- `src/components/shared/BlogBanner.tsx`
- `src/components/shared/CompletedBreadcrumbs.tsx`
- `src/components/shared/ProtectYourBike.tsx`
- `src/components/shared/TopNavBar.tsx`
- `src/components/shared/TopNavBlank.tsx`
- `src/components/shared/WhatOurCustomersSay.tsx`

### Marketing Components (17 files)
- `src/components/marketing/AboutUs/WhyInsureWithVelosure.tsx`
- `src/components/marketing/BrandAmbassador/WhyJonnyChoseVelo.tsx`
- `src/components/marketing/CoverComparison/CompareOurCover.tsx`
- `src/components/marketing/CoverComparison/ComparisonTableRow.tsx`
- `src/components/marketing/CoverComparison/ComparisonTableRowAlt.tsx`
- `src/components/marketing/CoverComparison/ComparisonTableRowMobile.tsx`
- `src/components/marketing/CoverFeatures/EBikeFeatures.tsx`
- `src/components/marketing/CoverFeatures/StandardFeatures.tsx`
- `src/components/marketing/OurCover/KeyBenefitsOfMultiBikeCover.tsx`
- `src/components/marketing/OurCover/WhyChooseSingleBikeCover.tsx`
- `src/components/marketing/OurCover/WhyChooseVelosure.tsx`
- `src/components/marketing/SubmitAClaim/WhatCanIClaimFor.tsx`
- `src/components/marketing/Travel/KeyFeatures.tsx`
- `src/components/marketing/BikesWeCover/TypesOfBikes.tsx`
- `src/components/marketing/OurCoverLevels/CorePerformanceIntro.tsx`
- `src/components/marketing/OurCoverLevels/VelosureCore.tsx`
- `src/components/marketing/OurCoverLevels/VelosurePerformance.tsx`
- `src/components/marketing/PolicyInformation/DownloadDocuments.tsx`

## Migration Strategy

For each component with inline SVGs:

1. **Extract SVG code** to a new `.svg` file in `src/assets/svgs/`
2. **Import the SVG** using URL import: `import IconName from '@/assets/svgs/icon-name.svg?url'`
3. **Replace inline SVG** with: `<img src={IconName} alt="Description" />`
4. **Preserve styling** by moving any CSS classes or inline styles to the `<img>` element

## Benefits of Migration

- **Consistency**: All SVGs will follow the same import pattern
- **Maintainability**: SVG code separated from component logic
- **Performance**: Better caching and loading strategies
- **Reusability**: SVGs can be shared across multiple components
- **Tooling compatibility**: Works with the current Vite configuration

## Next Steps

1. ✅ **Journey components migration complete** - All 7 journey components migrated
2. Prioritize shared components by usage frequency (Footer.tsx, TopNavBar.tsx, etc.)
3. Create SVG files with descriptive names
4. Test each component after migration
5. Update any CSS that targets the inline SVG elements
6. Remove this documentation once migration is complete

### Priority Migration Order (Shared Components)
1. `Footer.tsx` - High usage, likely contains multiple SVGs
2. `TopNavBar.tsx` - Navigation component, frequently rendered
3. `Breadcrumbs.tsx` - Common UI element
4. `CompletedBreadcrumbs.tsx` - Related to breadcrumbs
5. `ProtectYourBike.tsx` - Marketing component
6. `WhatOurCustomersSay.tsx` - Customer testimonials
7. `BlogBanner.tsx` - Blog-related
8. `TopNavBlank.tsx` - Less critical navigation variant

---

*Updated on: 2025-11-08*
*Total components migrated: 7/33*
*Total SVGs created: 12*
*Remaining components: 26*