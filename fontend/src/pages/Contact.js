import React from 'react'
import Layout from '../components/Layout/Layout';
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi';


const Contact = () => {
    return (
        <Layout title="Contact - Ecommerce App" description="Any query and info about prodduct feel free to call anytime we 24X7 vaialible" author="Ravikant Suthar" keywords="Contact us, Ecommerce, Ecommerce Web, Ecommerce Website, Ecommerce Web App">
            <div className="row contactus">
                <div className="col-md-6 ">
                    <img src="/images/contact.jpg" alt="/images/contactus.jpeg" style={{width: "100%" }} />
                </div>
                <div className="col-md-6">
                    <h1 className='bg-dark p-2 text-white text-center'>Contact US</h1>
                    <p className="text-justify mt-2">Any query and info about prodduct feel free to call anytime we 24X7 vaialible</p>
                    <p className="mt-3">
                        <BiMailSend /> : support@techbikana.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : +91 89493 84032
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : https://www.techbikana.com
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
