import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FiShield, FiZap, FiGlobe, FiLayers, FiTrendingUp, FiLock } from 'react-icons/fi';

const LandingPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: 'Cross-Chain',
      description: 'Maximize DeFi yields with multi-chain APY optimization across all major blockchains.',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Trusted & Insured',
      description: 'Maximize collateral security using insured custody with legally binding insurance.',
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Liquidity Staking',
      description: 'Supported DPoS coins are staked and incentives airdropped directly on chain.',
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: 'K-Assets',
      description: 'Create cross-chain wrappers for top-200 assets with 1:1 wrapped tokens.',
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Maximum Potential',
      description: 'Unlock your portfolio\'s maximum potential across the entire cryptoverse ecosystem.',
    },
    {
      icon: <FiLock className="w-8 h-8" />,
      title: 'Secure Notes',
      description: 'Store and manage your crypto research, strategies, and important notes securely.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
            >
              Cross-Chain Wrapped Assets
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-semibold mb-4 text-gray-200"
            >
              with Deposit Insurance
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Knit is a protocol for creating cross-chain wrappers for the top-200 assets.
              Deposit to insured custody and mint 1:1 wrapped K-Assets.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <a href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Learn More
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { value: '$1T+', label: 'Traditional Insurance' },
              { value: '200+', label: 'Supported Assets' },
              { value: '10K+', label: 'Active Users' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-effect p-6 rounded-2xl text-center card-hover"
              >
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Features
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Powerful features to unlock the full potential of your crypto assets
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <div className="text-primary-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Token Economy Section */}
      <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-12 text-white"
            >
              Token Economy
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Staking',
                  description: 'Redemption fees of K-Assets are rewarded to hard-locked token stackers.',
                },
                {
                  title: 'Secondary Market Support',
                  description: 'Fees generated from bridge usage are used to support the token\'s secondary market.',
                },
                {
                  title: 'Governance',
                  description: 'Ecosystem decisions are decided by Knit Stackers through decentralized voting.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="glass-effect p-8 rounded-2xl card-hover"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-primary-400">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-8"
            >
              Join thousands of users managing their crypto assets with Knit Finance
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-12 py-4"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
