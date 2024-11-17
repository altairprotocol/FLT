import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faqs: any = [
    {
      "question": "What is PrimalX?",
      "answer": "PrimalX is a centralized cryptocurrency exchange platform where users can buy, sell, and trade a variety of digital assets."
    },
    {
      "question": "How do I sign up for an account on PrimalX?",
      "answer": "To sign up for a PrimalX account, visit our website and click on the 'Sign Up' or 'Register' button. Follow the prompts to provide the required information, including your email address, password, and any other necessary details. Once you've completed the registration process, you'll need to verify your email address to activate your account."
    },
    {
      "question": "What cryptocurrencies can I trade on PrimalX?",
      "answer": "PrimalX supports a wide range of cryptocurrencies, including popular options like Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Ripple (XRP), and many others. We continually evaluate and add new cryptocurrencies to our platform to provide our users with diverse trading options."
    },
    {
      "question": "How can I deposit funds into my PrimalX account?",
      "answer": "You can deposit funds into your PrimalX account by navigating to the 'Deposit' section of your account dashboard. We offer various deposit methods, including bank transfers, credit/debit cards, and cryptocurrency deposits. Choose your preferred deposit option, follow the instructions provided, and complete the transaction."
    },
    {
      "question": "What security measures does PrimalX have in place to protect my account?",
      "answer": "At PrimalX, we take the security of our users' accounts and funds seriously. We employ industry-standard security protocols, including encryption, two-factor authentication (2FA), and cold storage for the majority of our users' funds. Additionally, we regularly conduct security audits and adhere to strict compliance measures to ensure the safety of our platform."
    },
    {
      "question": "How does trading work on PrimalX?",
      "answer": "Trading on PrimalX is simple and intuitive. Once you've deposited funds into your account, you can navigate to the trading section to place buy or sell orders. Choose the cryptocurrency pair you'd like to trade, specify the order type (market, limit, etc.), enter the desired quantity and price, and submit your order. Once matched with a corresponding order, your trade will be executed."
    },
    {
      "question": "What are the fees associated with using PrimalX?",
      "answer": "PrimalX charges competitive trading fees, which vary depending on factors such as trading volume and order type. You can find detailed information about our fee structure on our website or within your account dashboard. We strive to maintain transparent fee policies and offer competitive rates to our users."
    },
    {
      "question": "Is customer support available on PrimalX?",
      "answer": "Yes, we provide customer support to assist users with any questions, issues, or concerns they may have. You can reach our support team through various channels, including email, live chat, and our help center. We aim to provide timely and helpful assistance to ensure a positive experience for all our users."
    },
    {
      "question": "Does PrimalX offer mobile trading?",
      "answer": "Yes, PrimalX offers a mobile app for both iOS and Android devices, allowing users to trade cryptocurrencies on the go. Our mobile app provides the same features and functionalities as our web platform, ensuring a seamless trading experience across different devices."
    },
    {
      "question": "Is PrimalX regulated?",
      "answer": "PrimalX operates in compliance with applicable regulations and strives to maintain transparency and integrity in all our operations. While cryptocurrency regulations vary by jurisdiction, we work diligently to adhere to relevant legal requirements and implement best practices in our business operations."
    }]

  constructor(private location: Location) { }

  ngOnInit() {
    console.log(this.faqs, 56);

  }

  back() {
    this.location.back()
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
