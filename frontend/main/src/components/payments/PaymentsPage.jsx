import React from 'react'
import Lottie from "lottie-react";
import illustrative from '../../assets/lottie/illustrativeAnimation.json'
import ethereumLogo from '../../assets/lottie/ethereumLogo.json'
import './PaymentsPage.css'
import { InfoCircleOutlined } from '@ant-design/icons';

function PaymentsPage() {
    return (
        <div style={{ display: 'flex', backgroundColor: 'transparent', width: '100%', marginTop: 75, justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#13111c', borderRadius: '2rem', margin: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem', justifyContent: 'flex-start' }}>
                    Make Payment :
                </div>
                <div className='ethereum-card'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Lottie
                                style={{ width: '40%' }}
                                animationData={ethereumLogo} loop={true}
                            />
                        </div>
                        <div>
                            <InfoCircleOutlined />
                        </div>
                    </div>
                    <div>
                        <div>
                            a;ldjfadl
                        </div>
                        <div>
                            Ethereum
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <form className='payment-inputs-container'>
                        <input
                            name="addressFrom"
                            placeholder="addressFrom"
                        // onChange={handleTransactionFormDataChange}
                        />
                        <input
                            name="addressTo"
                            placeholder="addressTo"
                        // onChange={handleTransactionFormDataChange}
                        />
                        <div style={{ display: 'flex' }}>
                            <div>
                                Total Payable Amount :
                            </div>
                            <div style={{ marginLeft: '1rem' }}>8000</div>
                        </div>
                        <button className='payment-submit-btn' type="button">
                            Make Payment
                        </button>
                    </form>
                </div>
            </div>
            <div style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                <Lottie
                    style={{ width: '100%' }}
                    animationData={illustrative} loop={true}
                />
            </div>
        </div>
    )
}

export default PaymentsPage
