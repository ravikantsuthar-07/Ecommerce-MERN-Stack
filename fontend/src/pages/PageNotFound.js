import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title="Page Not Found - Ecommerce App" description="Any query and info about prodduct feel free to call anytime we 24X7 vaialible" author="Ravikant Suthar" keywords="Contact us, Ecommerce, Ecommerce Web, Ecommerce Website, Ecommerce Web App">
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found</h2>
        <Link to="/" className='pnf-btn'>
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
