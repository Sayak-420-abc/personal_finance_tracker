import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import * as transactionService from '../services/transactionService';

export function useTransactions(filters = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, filters],
    queryFn: () => transactionService.getAll(filters),
  });
}

export function useTransaction(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, id],
    queryFn: () => transactionService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: transactionService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.SUMMARY] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.MONTHLY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TREND] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.RECENT] });
    },
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => transactionService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.SUMMARY] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.MONTHLY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TREND] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.RECENT] });
    },
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: transactionService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.SUMMARY] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.MONTHLY_SPENDING] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.TREND] });
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.RECENT] });
    },
  });
}
