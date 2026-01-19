import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"
import axios from "axios"
import { withPaymentInterceptor } from "x402-axios"
import { config as loadEnv } from "dotenv"
import { createWalletClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { base } from "viem/chains"

const BASE_URL = "https://agents.402box.io"
const RESOURCE_PATH = "/x_searcher"
const TIMEOUT_MS = 300000

const getPrivateKey = (): `0x${string}` => {
  loadEnv({ path: new URL("../../.env", import.meta.url) })
  const key = process.env.X402_PRIVATE_KEY
  if (!key) {
    throw new Error("X402_PRIVATE_KEY is required")
  }
  return (key.startsWith("0x") ? key : `0x${key}`) as `0x${string}`
}

export const XSearcherPlugin: Plugin = async () => {
  return {
    tool: {
      x_searcher: tool({
        description:
          "AI-powered X/Twitter search agent - Get real-time trends, news, and social media insights",
        args: {
          query: tool.schema.string(),
        },
        async execute(args) {
          const privateKey = getPrivateKey()
          const account = privateKeyToAccount(privateKey)
          const walletClient = createWalletClient({
            account,
            chain: base,
            transport: http(),
          })

          const client = withPaymentInterceptor(
            axios.create({
              baseURL: BASE_URL,
              timeout: TIMEOUT_MS,
            }),
            walletClient
          )

          const response = await client.post(RESOURCE_PATH, {
            message: args.query,
          })

          if (!response.data?.data?.response) {
            throw new Error("Unexpected response from X Searcher")
          }

          return response.data.data.response
        },
      }),
    },
  }
}
