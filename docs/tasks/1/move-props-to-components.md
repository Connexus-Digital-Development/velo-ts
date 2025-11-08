# Task: Move Component Props to Components

**Status:** Completed
**Started:** 2025-11-08
**Completed:** 2025-11-08
**Description:** Move any props from @src/models/JourneyComponentTypes.ts to the component they belong to. Props can live at the top above the component declaration.

**Progress:**
- Successfully moved PaymentsProps to Payments component
- Successfully moved BikeSecurityProps to BikeSecurity component
- Successfully moved OptionalCoverProps to OptionalCover component
- Successfully moved AboutYourBikeProps to AboutYourBike component
- Successfully moved IndividualBikeProps to IndividualBike component
- Successfully moved DDFormProps to DDForm component
- Successfully moved AssumptionsProps to Assumptions component
- Successfully moved DDGuaranteeProps to DDGuarantee component
- Successfully moved JourneyCheckProps to JourneyCheck component
- Successfully moved QRPaymentProps to QRPayment component
- Successfully moved ManualAddressEntryProps to ManualAddressEntry component
- Successfully moved AddressPreviewProps to AddressPreview component
- Successfully moved AddressDropdownProps to AddressDropdown component
- Successfully moved MarketingPreferencesProps to MarketingPreferences component
- Successfully moved PreferenceButtonProps to PreferenceButton component
- Successfully moved YourQuoteProps to YourQuote component
- Successfully moved SummaryOfCoverProps to SummaryOfCover component
- Successfully moved SimpleBikeListProps to SimpleBikeList component
- Successfully moved QuoteReferralProps to QuoteReferral component
- Successfully moved FeatureListPerformanceProps to FeatureListPerformance component
- Successfully moved FeatureListCoreProps to FeatureListCore component
- Successfully moved DeclarationsProps to Declarations component
- Successfully moved IndividualBikeRowProps to IndividualBikeRow component
- Successfully moved BikeListWithLockInfoProps to BikeListWithLockInfo component
- Successfully moved PaymentMethodSelectorProps to PaymentMethodSelector component
- Successfully moved SinglePaymentProps to SinglePayment component
- Successfully moved CardPayProps to CardPay component
- Successfully moved QuickPayProps to QuickPay component

**Remaining interfaces to move (following the same pattern):**
None - All component props have been successfully moved to their respective components.

**Pattern established:**
1. Add the interface definition above the component declaration in the component file
2. Remove the interface from JourneyComponentTypes.ts
3. Ensure TypeScript compilation passes

All moved interfaces maintain their original definitions and functionality.
