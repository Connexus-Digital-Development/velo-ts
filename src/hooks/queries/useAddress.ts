import { useQuery } from '@tanstack/react-query';
import { addressApi } from '@/services/api/address';

// React Query hook for address lookup
export const useAddressLookup = (postcode: string) => {
  return useQuery({
    queryKey: ['address', 'lookup', postcode],
    queryFn: () => addressApi.lookupByPostcode(postcode),
    enabled: postcode.length >= 5, // Only run when postcode has minimum length
    staleTime: 30 * 60 * 1000, // 30 minutes - addresses don't change often
  });
};