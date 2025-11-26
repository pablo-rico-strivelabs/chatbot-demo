import { fetchWrapper } from '@/src/utils/request'
import { VercelToolCollection } from '@composio/vercel'
import { useQuery } from '@tanstack/react-query'

interface ToolResponse {
  toolList: VercelToolCollection
}

const fetchTools = (): Promise<ToolResponse> => fetchWrapper('/api/tools')

const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: () => fetchTools(),
  })
}

export { useTools, fetchTools }
