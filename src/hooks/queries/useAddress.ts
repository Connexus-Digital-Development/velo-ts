import { useQuery } from '@tanstack/react-query';
import { addressApi } from '@/services/api/address';

// React Query hook for address lookup
export const useAddressLookup = (
  postcode: string,
  enabled = postcode.length >= 5,
) => {
  return useQuery({
    queryKey: ['address', 'lookup', postcode],
    queryFn: () => addressApi.lookupByPostcode(postcode),
    enabled, // Only run when explicitly enabled and postcode has minimum length
    staleTime: 30 * 60 * 1000, // 30 minutes - addresses don't change often
  });
};