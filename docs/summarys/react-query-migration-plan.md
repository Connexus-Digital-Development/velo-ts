# React Query Migration Plan

## Overview

This document outlines the plan to migrate all HTTP calls in components from direct `fetch()` and `useFetch()` implementations to React Query for improved caching, error handling, and state management.

## Current HTTP Calls Identified

### 1. Journey Components

#### Address Lookup (AboutYou.tsx)
- **File**: `src/components/journey/step-two/AboutYou.tsx`
- **Endpoint**: `GET /api/AddressLookup/AddressLookup?postcode={postcode}`
- **Purpose**: Lookup UK addresses by postcode for auto-completion
- **Data Structure**: `AddressLookupResponse` with address items
- **Usage**: Populates address dropdown, updates global state

#### Quote Generation (StepThree.tsx)
- **File**: `src/pages/journey/StepThree.tsx`
- **Endpoint**: `POST /PedalCycle/GetQuote`
- **Purpose**: Generate bike insurance quotes based on risk model
- **Data Structure**: Complex quote object with core/performance schemes
- **Usage**: Creates quotes, sends confirmation emails, updates global state

#### Quote Retrieval (QuoteSummary.tsx)
- **File**: `src/pages/journey/QuoteSummary.tsx`
- **Endpoint**: `POST /AggregatorBackoffice/RetrieveQuote`
- **Purpose**: Retrieve existing quotes by ID for external links
- **Data Structure**: Quote data with core/performance quotes
- **Usage**: Hydrates state for quote display, handles expired/incepted quotes

#### Quote Retrieval by Details (QRLandingPage.tsx)
- **File**: `src/pages/journey/QRLandingPage.tsx`
- **Endpoint**: `POST /PedalCycle/RetrieveQuote`
- **Purpose**: Retrieve quotes using DOB and postcode verification
- **Data Structure**: Quote data with validation
- **Usage**: Validates user details, retrieves quotes for purchase

### 2. Marketing Components

#### Blog Articles (MoreBlogs.tsx)
- **File**: `src/components/marketing/Pitstop/MoreBlogs.tsx`
- **Endpoint**: `GET /api/ConnexusCMS/Articles/GetNumberOfArticles/{brand}/{count}`
- **Purpose**: Fetch recent blog articles excluding current article
- **Data Structure**: Array of article objects with metadata
- **Usage**: Display article cards with pagination

#### Individual Blog Article (FullBlog.tsx)
- **File**: `src/pages/marketing/FullBlog.tsx`
- **Endpoint**: `GET /api/ConnexusCMS/Articles/GetArticleFromSlug/{slug}`
- **Purpose**: Fetch complete blog article content by URL slug
- **Data Structure**: Full article object with SEO metadata
- **Usage**: Render blog content, set SEO tags, social sharing

#### Contact Form Submission (ContactUsForm.tsx)
- **File**: `src/components/marketing/ContactUs/ContactUsForm.tsx`
- **Endpoint**: `POST /api/Email/ContactUs`
- **Purpose**: Submit contact form inquiries
- **Data Structure**: Contact form data with marketing preferences
- **Usage**: Send emails, show success/error states

### 3. Custom Hook

#### useFetch Hook (useFetch.ts)
- **File**: `src/hooks/useFetch.ts`
- **Purpose**: Generic fetch wrapper with loading/error states
- **Current Usage**: Used by QuoteSummary.tsx
- **Issues**: 1-second artificial delay, basic error handling

## React Query Implementation Plan

### 1. Setup and Configuration

```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && 'status' in error && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
```

### 2. API Service Layer

Create dedicated service functions for each API endpoint:

```typescript
// src/services/api/quotes.ts
export const quotesApi = {
  generateQuote: (riskModel: RiskModel) =>
    apiClient.post('/PedalCycle/GetQuote', riskModel),

  retrieveQuote: (quoteId: string) =>
    apiClient.post('/AggregatorBackoffice/RetrieveQuote', { QuoteId: quoteId }),

  retrieveQuoteByDetails: (data: QuoteRetrievalData) =>
    apiClient.post('/PedalCycle/RetrieveQuote', data),
};

// src/services/api/address.ts
export const addressApi = {
  lookupByPostcode: (postcode: string) =>
    apiClient.get(`/AddressLookup/AddressLookup?postcode=${postcode}`),
};

// src/services/api/content.ts
export const contentApi = {
  getArticles: (brand: string, count: number) =>
    apiClient.get(`/ConnexusCMS/Articles/GetNumberOfArticles/${brand}/${count}`),

  getArticleBySlug: (slug: string) =>
    apiClient.get(`/ConnexusCMS/Articles/GetArticleFromSlug/${slug}`),
};

// src/services/api/contact.ts
export const contactApi = {
  submitContactForm: (data: ContactFormData) =>
    apiClient.post('/Email/ContactUs', data),
};
```

### 3. React Query Hooks

```typescript
// src/hooks/queries/useQuotes.ts
export const useGenerateQuote = (riskModel: RiskModel, enabled = false) => {
  return useMutation({
    mutationFn: quotesApi.generateQuote,
    onSuccess: (data) => {
      // Handle email sending, state updates
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};

export const useRetrieveQuote = (quoteId: string) => {
  return useQuery({
    queryKey: ['quotes', 'retrieve', quoteId],
    queryFn: () => quotesApi.retrieveQuote(quoteId),
    enabled: !!quoteId,
  });
};

// src/hooks/queries/useAddress.ts
export const useAddressLookup = (postcode: string) => {
  return useQuery({
    queryKey: ['address', 'lookup', postcode],
    queryFn: () => addressApi.lookupByPostcode(postcode),
    enabled: postcode.length >= 5,
    staleTime: 30 * 60 * 1000, // 30 minutes - addresses don't change often
  });
};

// src/hooks/queries/useContent.ts
export const useArticles = (brand: string, count: number) => {
  return useQuery({
    queryKey: ['content', 'articles', brand, count],
    queryFn: () => contentApi.getArticles(brand, count),
    staleTime: 15 * 60 * 1000, // 15 minutes - content updates moderately
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['content', 'article', slug],
    queryFn: () => contentApi.getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes - articles don't change often
  });
};

// src/hooks/queries/useContact.ts
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: contactApi.submitContactForm,
    onSuccess: () => {
      // Handle success (show success message, etc.)
    },
  });
};
```

### 4. Component Migration Strategy

#### Phase 1: Address Lookup (High Priority - User Experience)
- Replace fetch in AboutYou.tsx with useAddressLookup hook
- Benefits: Cached results prevent repeated API calls for same postcode
- Update state management to work with React Query

#### Phase 2: Quote Operations (High Priority - Core Business Logic)
- Replace fetch in StepThree.tsx with useGenerateQuote mutation
- Replace useFetch in QuoteSummary.tsx with useRetrieveQuote query
- Replace fetch in QRLandingPage.tsx with useRetrieveQuoteByDetails mutation
- Benefits: Better error handling, loading states, automatic retries

#### Phase 3: Content Management (Medium Priority)
- Replace fetch in MoreBlogs.tsx with useArticles query
- Replace fetch in FullBlog.tsx with useArticle query
- Benefits: Cached blog content, faster page loads, reduced API calls

#### Phase 4: Contact Forms (Low Priority)
- Replace fetch in ContactUsForm.tsx with useSubmitContactForm mutation
- Benefits: Better error handling, loading states

### 5. State Management Integration

Update components to work with React Query's data flow:

```typescript
// Before (direct fetch)
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

// After (React Query)
const { data, isLoading, error } = useAddressLookup(postcode);
```

### 6. Error Handling Strategy

Implement consistent error handling across all queries:

```typescript
const { data, error, isError } = useQuery({
  // ... query options
});

if (isError) {
  // Use error.message or custom error components
  return <ErrorMessage error={error} />;
}
```

### 7. Loading States

Replace custom loading states with React Query's built-in states:

```typescript
const { isLoading, isFetching } = useQuery({...});

// isLoading: true on first load, false thereafter
// isFetching: true whenever background refetch is happening
```

### 8. Cache Invalidation Strategy

Define cache invalidation patterns:

```typescript
// After successful quote generation
queryClient.invalidateQueries({ queryKey: ['quotes'] });

// After address lookup (less common)
queryClient.invalidateQueries({ queryKey: ['address'] });
```

### 9. Testing Strategy

- Unit tests for API service functions
- Integration tests for React Query hooks
- E2E tests to verify caching behavior
- Error boundary testing for failed requests

### 10. Migration Checklist

- [ ] Install @tanstack/react-query
- [ ] Set up QueryClient provider in App.tsx
- [ ] Create API service layer
- [ ] Implement React Query hooks
- [ ] Migrate components phase by phase
- [ ] Update error handling patterns
- [ ] Test all user flows
- [ ] Remove old useFetch hook
- [ ] Update documentation

## Benefits of Migration

1. **Automatic Caching**: Eliminates redundant API calls
2. **Better UX**: Built-in loading/error states
3. **Error Handling**: Consistent retry logic and error boundaries
4. **Background Updates**: Automatic data refetching
5. **Developer Experience**: Simplified data fetching logic
6. **Performance**: Reduced bundle size (no custom hooks), better memory management

## Risks and Mitigations

1. **Breaking Changes**: Test thoroughly, migrate incrementally
2. **Cache Staleness**: Configure appropriate staleTime values
3. **Memory Usage**: Monitor QueryClient cache size
4. **Testing Complexity**: Ensure comprehensive test coverage

## Timeline Estimate

- Phase 1 (Address Lookup): 2-3 days
- Phase 2 (Quote Operations): 4-5 days
- Phase 3 (Content): 2-3 days
- Phase 4 (Contact): 1-2 days
- Testing & Polish: 2-3 days

**Total Estimate**: 11-16 days