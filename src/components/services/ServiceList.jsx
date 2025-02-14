import React from 'react'
import Electrician from '../../assets/electrician.png'
import Painter from '../../assets/Painter.png'
import { ServiceButtonRight, ServiceButtonLeft } from '../../components/button/ServiceButton';

function ServiceList() {
  return (
    


    <section class="py-12 bg-transparent">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-start mb-8">All Services</h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
                <ServiceButtonRight image={Electrician} name='Electrician'/>
                <ServiceButtonLeft image={Painter} name='Painter'/>
            </div>
        </div>
    </section>
  )
}

export default ServiceList