// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import {
  RoochHTTPTransport,
  RoochTransportRequestOptions,
  RoochHTTPTransportOptions,
} from '@roochnetwork/rooch-sdk'

export type requestCallbackType = (
  state: 'requesting' | 'error' | 'success',
  error?: {
    code: number
    message: string
    location?: string
  },
) => void
export class HTTPTransport extends RoochHTTPTransport {
  private readonly requestCallback: requestCallbackType

  constructor(options: RoochHTTPTransportOptions, requestErrorCallback: requestCallbackType) {
    super(options)
    this.requestCallback = requestErrorCallback
  }

  async request<T>(input: RoochTransportRequestOptions): Promise<T> {
    let result: T
    try {
      if (input.method === 'rooch_executeRawTransaction') {
        this.requestCallback('requesting')
      }

      result = await super.request(input)

      if (input.method === 'rooch_executeRawTransaction') {
        const tmp = result as any

        if (tmp.execution_info.status.type !== 'executed') {
          this.requestCallback('error', {
            code: tmp.execution_info.status.abort_code,
            message: tmp.execution_info.status.type,
            location: tmp.execution_info.status.location,
          })
        } else {
          this.requestCallback('success')
        }
      }

      return result
    } catch (e: any) {
      if ('code' in e) {
        this.requestCallback('error', {
          code: e.code,
          message: e.message,
        })
      }
      throw e
    }
  }
}
