import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import * as analyticsService from '../services/analyticsService';

export function useSummary() {
  return useQuery({
    queryKey: [QUERY_KEYS.SUMMARY],
    queryFn: analyticsService.getSummary,
  });
}

export function useCategorySpending() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY_SPENDING],
    queryFn: analyticsService.getCategorySpending,
  });
}

export function useMonthlySpending() {
  return useQuery({
    queryKey: [QUERY_KEYS.MONTHLY_SPENDING],
    queryFn: analyticsService.getMonthlySpending,
  });
}

export function useSpendingTrend() {
  return useQuery({
    queryKey: [QUERY_KEYS.TREND],
    queryFn: analyticsService.getSpendingTrend,
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT],
    queryFn: analyticsService.getRecentTransactions,
  });
}
