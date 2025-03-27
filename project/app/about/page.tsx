import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CreditCard, BarChart3, DollarSign, Lock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-500">APT_BANKING</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-500">APT_BANKING</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're on a mission to make finance simple, transparent, and accessible for everyone. 
              Our platform connects all your financial accounts in one place, giving you a complete view of your finances.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2023, APT_BANKING was created to solve a common problem: the fragmentation of financial services and the complexity of managing multiple accounts across different institutions.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our team of financial experts and technology innovators came together with a shared vision - to build a platform that simplifies banking and empowers users to take control of their financial lives.
              </p>
              <p className="text-lg text-gray-600">
                Today, we serve thousands of customers who rely on our platform to manage their finances, track spending, and make informed financial decisions.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To simplify financial management and empower people to achieve their financial goals through innovative technology and exceptional service.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  A world where everyone has the tools and knowledge to manage their finances effectively, make informed decisions, and build a secure financial future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at APT_BANKING
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
              <p className="text-gray-600">
                We prioritize the security of your financial data above all else, implementing bank-level encryption and security protocols.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in all our operations, from our fee structure to how we handle your data.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to provide cutting-edge financial tools that make managing your money easier and more effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Meet the experts behind APT_BANKING
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 mx-auto rounded-full overflow-hidden w-32 h-32">
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Tarang Bhargava</h3>
              <p className="text-blue-500 mb-2">CEO & Co-Founder</p>
              
            </div>
            
            <div className="text-center">
              <div className="mb-4 mx-auto rounded-full overflow-hidden w-32 h-32">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQG0LDOw17yQrA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698481466680?e=2147483647&v=beta&t=7jGxntLcebE3Oy4qbYgFljkvrEgNR2GXaQcKbCf8DtI" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Akshat Neolia</h3>
              <p className="text-blue-500 mb-2">CTO & Co-Founder</p>
              
            </div>
            
            <div className="text-center">
              <div className="mb-4 mx-auto rounded-full overflow-hidden w-32 h-32">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5603AQGo9o1Dgil9lw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1704812209706?e=1746662400&v=beta&t=0k27-TmlSkAiy506SojIA0vhT1LgY8dIwcE5hNs4A0c" 
                  alt="CFO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Priyanshu Kumar</h3>
              <p className="text-blue-500 mb-2">Chief Financial Officer</p>
          
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your banking experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances more effectively with APT_BANKING.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="bg-white text-blue-500 hover:bg-blue-50">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">APT_BANKING</h3>
              <p className="text-gray-400">Modern banking solution for all your financial needs.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} APT_BANKING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}