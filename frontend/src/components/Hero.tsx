import React from 'react';
import { ArrowRight, Leaf, Recycle, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-green-50">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="p-3 bg-primary-100 rounded-full">
              <Recycle className="h-8 w-8 text-primary-600" />
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme seus
            <span className="text-primary-600 block">Resíduos em Impacto</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conectamos você aos melhores serviços de coleta sustentável. 
            Agende sua coleta em minutos e contribua para um planeta mais verde.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
              <span>Agendar Coleta</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Rápido</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Sustentável</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}