import { fetchWrapper } from '@/src/utils/request'
import { VercelToolCollection } from '@composio/vercel'
import { useQuery } from '@tanstack/react-query'

interface Tool {
  description: string;
  inputSchema: Record<string, unknown>;
}

type ToolName = string;

interface ToolApiResponse {
  toolList: Record<ToolName, Tool>;
}

interface ToolResponse {
    name: string;
    description: string;
}

const fetchTools = async (): Promise<ToolResponse[]> => {
    const data: ToolApiResponse = await fetchWrapper('/api/tools')
    return Object.keys(data.toolList).map((toolName) => ({
        name: toolName,
        description: data.toolList[toolName].description,
    }))
}   

const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: () => fetchTools(),
  })
}

export { useTools, fetchTools }
