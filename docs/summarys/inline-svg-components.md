This document lists all React components in the codebase that still contain inline SVG elements embedded directly in their JSX code.

**Note:** Components in the `src/components/icons/` folder are intentionally excluded from migration as they are handled separately.

## Overview

After migrating SVG assets from the `src/assets/svgs/` directory to use URL imports with `<img>` tags, **26 components** still contain inline SVG code that should be converted for consistency and maintainability.

## Background

Previously, the codebase had compatibility issues with SVG-to-React component transformation due to the custom Rolldown-based Vite build. The solution was to:

1. Convert SVG asset imports from `import Component from 'file.svg?react'` to `import Component from 'file.svg?url'`
2. Change JSX usage from `<Component />` to `<img src={Component} alt="description" />`

However, many components still have inline SVG code that should be extracted to separate SVG files and imported using the same URL approach.

## Migration Progress

### ✅ **Completed Components (11/33):**

**Journey Components (7/8):**
- ✅ `src/components/journey/step-one/IndividualBike.tsx` - Electric & regular bike icons
- ✅ `src/components/journey/step-one/BikeSecurity.tsx` - Home, outbuilding & communal security icons
- ✅ `src/components/journey/step-one/OptionalCover.tsx` - Info icon
- ✅ `src/components/journey/step-three/FeatureList_CORE.tsx` - Cross, tick, chevron icons
- ✅ `src/components/journey/step-three/FeatureList_PERFORMANCE.tsx` - Cross, tick, chevron icons (reused existing SVGs)
- ✅ `src/components/journey/step-four/DDGuarantee.tsx` - Direct Debit guarantee logo
- ✅ `src/components/journey/PolicyConfirmation.tsx` - Success confirmation icon

**Shared Components (5/8):**
- ✅ `src/components/shared/Footer.tsx`
- ✅ `src/components/shared/TopNavBar.tsx` - Mobile navbar logo
- ✅ `src/components/shared/WhatOurCustomersSay.tsx` - Cog decorative icon
- ✅ `src/components/shared/BlogBanner.tsx` - Background banner graphic
- ✅ `src/components/shared/TopNavBlank.tsx` - Navigation logo (migrated to use VelosureLogoNavbar component)
- ✅ `src/components/shared/Breadcrumbs.tsx` - Complex breadcrumb navigation SVG
- ✅ `src/components/shared/CompletedBreadcrumbs.tsx` - Complex breadcrumb navigation SVG
- ✅ `src/components/shared/ProtectYourBike.tsx` - Multiple icons

**Marketing Components (1/17):**
- ✅ `src/components/marketing/AboutUs/WhyInsureWithVelosure.tsx` - Sports & events cover icon
- ✅ `src/components/marketing/BrandAmbassador/WhyJonnyChoseVelo.tsx` - Accessory cover, organised races & events, and worldwide cover icons
- ✅ `src/components/marketing/CoverComparison/CompareOurCover.tsx` - Bike gear icon
- ✅ `src/components/marketing/CoverComparison/ComparisonTableRow.tsx` - Checkmark icons (6 instances)

**SVGs Created (25 total):**
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
- `velosure-logo-mobile.svg`
- `what-our-customers-say-cog-icon.svg`
- `blog-banner-background.svg`
- `breadcrumb-step-1.svg`
- `breadcrumb-step-2.svg`
- `breadcrumb-step-3.svg`
- `breadcrumb-step-4.svg`
- `sports-events-cover-icon.svg`
- `accessory-cover-icon.svg`
- `organised-races-events-icon.svg`
- `worldwide-cover-icon.svg`
- `bike-gear-icon.svg`
- `checkmark-icon.svg`

## Components Requiring Migration

### Shared Components (5 files)
- ✅ `src/components/shared/Footer.tsx`
- `src/components/shared/Breadcrumbs.tsx` - Complex breadcrumb navigation SVG
- `src/components/shared/CompletedBreadcrumbs.tsx` - Complex breadcrumb navigation SVG
- `src/components/shared/ProtectYourBike.tsx` - Multiple icons
- ✅ `src/components/shared/TopNavBlank.tsx` - Navigation logo (migrated to use VelosureLogoNavbar component)
- `src/components/shared/BlogBanner.tsx` - Background banner graphic

### Marketing Components (16 files)
- `src/components/marketing/AboutUs/WhyInsureWithVelosure.tsx`
- `src/components/marketing/BrandAmbassador/WhyJonnyChoseVelo.tsx`
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

### Priority Migration Order
1. **Single SVG Components (High Priority - Low Risk)** - Start with TopNavBlank (1 SVG)
2. **Complex Shared Components** - Breadcrumbs (large single SVG)
3. **Marketing Components** - Multiple SVG components (highest complexity)

### Single SVG Components (Recommended to migrate first):
**Shared Components (1 file - 1 SVG):**
- `src/components/shared/TopNavBlank.tsx` - Navigation logo (1 SVG)

### Complex Components (Multiple SVGs - Higher Risk):
**Shared Components:**
- `src/components/shared/Breadcrumbs.tsx` - Complex multi-path breadcrumb SVG
- `src/components/shared/CompletedBreadcrumbs.tsx` - Complex multi-path breadcrumb SVG

**Marketing Components (with multiple SVGs):**
- `src/components/marketing/CoverComparison/ComparisonTableRow.tsx` - Multiple SVGs (5+ different icons)
- Other marketing components likely contain multiple SVGs each

### Next Steps
1. ✅ **Journey components migration complete** - All 7 journey components migrated
2. ✅ **Single SVG migration complete** - TopNavBlank component migrated (using VelosureLogoNavbar component)
3. **Complex shared components** - Breadcrumbs (large single SVG)
4. **Marketing components** - Multiple SVG components (highest complexity)
5. Create SVG files with descriptive names
6. Test each component after migration
7. Update any CSS that targets the inline SVG elements
8. Remove this documentation once migration is complete

---

*Updated on: 2025-11-09*
*Total components migrated: 14/32*
*Total SVGs created: 25*
*Remaining components: 18*
