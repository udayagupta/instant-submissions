import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createForm as createFormApi, getForms as getFormsApi } from "../lib/api"

const useForms = () => {
  const queryClient = useQueryClient()

  const formsQuery = useQuery({
    queryKey: ["forms"],
    queryFn: getFormsApi,
  })

  const createFormMutation = useMutation({
    mutationFn: createFormApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] })
    },
  })

  return {
    forms: formsQuery.data ?? [],
    isLoading: formsQuery.isLoading,
    isError: formsQuery.isError,
    createForm: createFormMutation.mutate,
    isCreating: createFormMutation.isPending,
  }
}

export default useForms