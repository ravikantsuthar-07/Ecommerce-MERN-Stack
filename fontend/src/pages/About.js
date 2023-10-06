import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title="About - Ecommerce App" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum id nobis, aspernatur illum neque, labore maiores nesciunt aliquid ipsa exercitationem tempore quae accusamus voluptas sunt at! Eum deleniti officia ullam consequuntur esse totam voluptatem dolorem, error praesentium. Officiis suscipit incidunt modi voluptates maxime cumque minima illum ad quod cupiditate similique" author="Ravikant Suthar" keywords="About us, Ecommerce, Ecommerce Web, Ecommerce Website, Ecommerce Web App">
        <div className="row m-5 contactus">
            <div className="col-md-6 ">
                <img src="/images/contact.jpg" alt="/images/contactus.jpeg" style={{width: "100%" }} />
            </div>
            <div className="col-md-6">
                <h1 className='bg-dark p-2 text-white text-center'>About US</h1>
                <p className='text-center justify-center m-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum id nobis, aspernatur illum neque, labore maiores nesciunt aliquid ipsa exercitationem tempore quae accusamus voluptas sunt at! Eum deleniti officia ullam consequuntur esse totam voluptatem dolorem, error praesentium. Officiis suscipit incidunt modi voluptates maxime cumque minima illum ad quod cupiditate similique illo et nobis reiciendis, nihil commodi eum hic. Corrupti, inventore cupiditate voluptate aut perferendis officiis! Maxime error rerum sequi necessitatibus veritatis, molestiae vero voluptatum quis illo, veniam similique eaque consequuntur.
                </p>
            </div>
        </div>
        </Layout>
    )
}

export default About
