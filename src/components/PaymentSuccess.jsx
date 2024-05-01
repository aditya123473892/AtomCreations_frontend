// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        
            <div >

                <h2> Order Successfull</h2>

                <parseInt>
                    Reference No.{referenceNum}
                </parseInt>

            </div>
        
    )
}

export default PaymentSuccess