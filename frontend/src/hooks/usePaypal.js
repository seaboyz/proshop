import { useEffect, useState } from 'react'
import axios from 'axios'

// load paypalSDK script, return true once loading complete
const usePaypalSDK = () => {
  const [sdkIsReady, setSdkReady] = useState(false)
  useEffect(() => {
    if (!window.paypal) {
      const loadPaypalSDK = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      loadPaypalSDK()
    } else {
      setSdkReady(true)
    }
  }, [])
  return sdkIsReady
}

export default usePaypalSDK
