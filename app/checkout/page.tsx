'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { updateShippingAddress } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Truck, Shield, Check } from 'lucide-react';

const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  streetAddress1: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  countryArea: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string(),
});

type AddressForm = z.infer<typeof addressSchema>;

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number is required'),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
});

type PaymentForm = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const dispatch = useAppDispatch();
  const { items, checkoutId, isLoading } = useAppSelector((state) => state.cart);

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  });

  const subtotal = items.reduce((total, item) => 
    total + (item.variant.pricing.price.gross.amount * item.quantity), 0
  );

  const shippingCost = shippingMethod === 'express' ? 299 : 0;
  const total = subtotal + shippingCost;

  const onAddressSubmit = async (data: AddressForm) => {
    if (checkoutId) {
      await dispatch(updateShippingAddress({
        checkoutId,
        shippingAddress: data,
      }));
      setCurrentStep(2);
    }
  };

  const onPaymentSubmit = async (data: PaymentForm) => {
    // Handle payment processing
    console.log('Payment data:', data);
    setCurrentStep(3);
  };

  const steps = [
    { number: 1, title: 'Shipping', completed: currentStep > 1 },
    { number: 2, title: 'Payment', completed: currentStep > 2 },
    { number: 3, title: 'Confirmation', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.number 
                      ? 'bg-[#CF00FF] text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleAddressSubmit(onAddressSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        {...registerAddress('firstName')}
                        className={addressErrors.firstName ? 'border-red-300' : ''}
                      />
                      {addressErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        {...registerAddress('lastName')}
                        className={addressErrors.lastName ? 'border-red-300' : ''}
                      />
                      {addressErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="streetAddress1">Street Address</Label>
                    <Input
                      {...registerAddress('streetAddress1')}
                      className={addressErrors.streetAddress1 ? 'border-red-300' : ''}
                    />
                    {addressErrors.streetAddress1 && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.streetAddress1.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        {...registerAddress('city')}
                        className={addressErrors.city ? 'border-red-300' : ''}
                      />
                      {addressErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.city.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="countryArea">State</Label>
                      <Input
                        {...registerAddress('countryArea')}
                        className={addressErrors.countryArea ? 'border-red-300' : ''}
                      />
                      {addressErrors.countryArea && (
                        <p className="text-red-500 text-sm mt-1">{addressErrors.countryArea.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      {...registerAddress('postalCode')}
                      className={addressErrors.postalCode ? 'border-red-300' : ''}
                    />
                    {addressErrors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.postalCode.message}</p>
                    )}
                  </div>

                  {/* Shipping Method */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                              <p className="text-sm text-gray-500">5-7 business days</p>
                            </div>
                            <div className="text-green-600 font-semibold">Free</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                              <p className="text-sm text-gray-500">2-3 business days</p>
                            </div>
                            <div className="text-gray-900 font-semibold">₹299</div>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-[#CF00FF] hover:bg-[#B800E6] text-white py-4">
                    Continue to Payment
                  </Button>
                </form>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                
                <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      {...registerPayment('cardholderName')}
                      placeholder="John Doe"
                      className={paymentErrors.cardholderName ? 'border-red-300' : ''}
                    />
                    {paymentErrors.cardholderName && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardholderName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        {...registerPayment('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                        className={paymentErrors.cardNumber ? 'border-red-300' : ''}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {paymentErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        {...registerPayment('expiryDate')}
                        placeholder="MM/YY"
                        className={paymentErrors.expiryDate ? 'border-red-300' : ''}
                      />
                      {paymentErrors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        {...registerPayment('cvv')}
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        className={paymentErrors.cvv ? 'border-red-300' : ''}
                      />
                      {paymentErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-[#CF00FF] hover:bg-[#B800E6] text-white">
                      Complete Order
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your purchase. We{"'"}ll send you a confirmation email shortly.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-lg font-semibold text-gray-900">#KMB-{Date.now().toString().slice(-6)}</p>
                </div>

                <Button size="lg" className="bg-[#CF00FF] hover:bg-[#B800E6] text-white">
                  Track Your Order
                </Button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-gray-100">
                    {/* {item.variant.product.thumbnail && (
                      <Image
                        src={item.variant.product.thumbnail.url}
                        alt={item.variant.product.name}
                        fill
                        className="object-cover"
                      />
                    )} */}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {item.variant.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ₹{(item.variant.pricing.price.gross.amount * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shippingCost}`
                  )}
                </span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-[#B800E6]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#CF00FF]" />
                <span>Free Returns within 30 days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}