'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Map, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SparklesText from '@/components/ui/sparkles-text';

export default function LandingPage() {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white">
        <div className="container mx-auto max-w-4xl px-4 pt-8 pb-16">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeInUp} className="order-2 md:order-1">
              <SparklesText
                text="おでかけしよう"
                className="text-4xl md:text-5xl font-bold p-4"
                colors={{ first: '#ffff00', second: '#afeeee' }}
              />
              <p className="text-xl p-4 mb-4 text-blue-50">
                下関のおでかけスポットを
                <br />
                探せるアプリです。
              </p>
              <Button
                onClick={() => router.push('/map')}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-6 px-8 m-4 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg text-lg"
              >
                マップを見る <Map className="ml-2" />
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="order-1 md:order-2">
              <Image
                src="/images/about-image.png"
                alt="Hero Image"
                width={400}
                height={300}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <main>
        <ScrollAnimatedSection>
          <h2 className="text-center text-3xl font-bold mb-12 text-blue-600">
            アプリでできること
          </h2>
          <motion.ul
            className="grid md:grid-cols-3 gap-8"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {[
              {
                image: '/images/about-ul1-1.png',
                text: 'マップからおでかけスポットをさがせる',
              },
              {
                image: '/images/about-ul1-2.png',
                text: 'リストからおでかけスポットをさがせる',
              },
              {
                image: '/images/about-ul1-3.png',
                text: 'おでかけした人のレビューがよめる',
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <Image
                  src={item.image}
                  alt="App Image"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg mt-4 mb-8 border"
                />
                <p className="text-center text-lg text-gray-700">{item.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </ScrollAnimatedSection>

        <section className="py-16 px-4 bg-gray-100">
          <ScrollAnimatedSection>
            <h2 className="text-center text-3xl font-bold mb-12 text-blue-600">
              アカウント登録すると
            </h2>
            <motion.ul
              className="grid md:grid-cols-3 gap-8"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {[
                {
                  image: '/images/about-ul2-1.png',
                  text: '新しいおでかけスポットを登録できる',
                },
                {
                  image: '/images/about-ul2-2.png',
                  text: 'プロフィールを編集できる',
                },
                {
                  image: '/images/about-ul2-3.png',
                  text: 'おでかけスポットのレビューを投稿できる',
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                >
                  <Image
                    src={item.image}
                    alt="App Image"
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover rounded-lg mt-4 mb-8 border"
                  />
                  <p className="text-center text-lg text-gray-700">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </ScrollAnimatedSection>
        </section>

        <ScrollAnimatedSection>
          <h2 className="text-center text-3xl font-bold mb-12 text-blue-600">
            下関ってどこ？
          </h2>
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            variants={fadeInUp}
          >
            <Image
              src="/images/about-map.png?height=400&width=800"
              alt="下関の地図"
              width={800}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                本州最西端に位置する下関市は、古くから陸運と海運の要所として豊かな歴史と文化を育んできました。
              </p>
              <p className="text-gray-700 mb-8">
                地元の方も、まだ訪れたことのない方も、ぜひ下関の魅力を感じてみませんか？
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pb-4">
                <Button
                  onClick={() => router.push('/sign_up')}
                  className="bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white font-semibold py-6 px-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg"
                >
                  アカウント登録 <UserPlus className="ml-2" />
                </Button>
                <Button
                  onClick={() => router.push('/map')}
                  variant="outline"
                  className="border-2 border-sky-400 text-sky-400 hover:bg-blue-50 hover:text-sky-500 font-semibold py-6 px-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg"
                >
                  マップを見る <Map className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollAnimatedSection>
      </main>
    </div>
  );
}

function ScrollAnimatedSection({ children }: { children: React.ReactNode }) {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="py-16 px-4"
    >
      <div className="container mx-auto max-w-4xl">{children}</div>
    </motion.section>
  );
}
