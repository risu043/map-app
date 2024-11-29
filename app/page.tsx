'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Map, List, MessageSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white">
        <div className="container mx-auto max-w-4xl px-4 pt-8 pb-16">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div {...fadeInUp} className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                おでかけしよう
              </h1>
              <p className="text-xl mb-8 text-blue-50">
                下関のおでかけスポットを
                <br />
                探せるアプリです。
              </p>
              <Button
                onClick={() => router.push('/')}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-6 px-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg text-lg"
              >
                マップを見る <Map className="ml-2" />
              </Button>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 md:order-2">
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
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-center text-3xl font-bold mb-12 text-blue-600"
              {...fadeInUp}
            >
              アプリでできること
            </motion.h2>
            <motion.ul
              className="grid md:grid-cols-3 gap-8"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
              }}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: Map, text: 'マップからおでかけスポットをさがせる' },
                { icon: List, text: 'リストからおでかけスポットをさがせる' },
                {
                  icon: MessageSquare,
                  text: 'おでかけした人のレビューがよめる',
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  {...fadeInUp}
                >
                  <item.icon className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                  <p className="text-center text-lg text-gray-700">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-100">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-center text-3xl font-bold mb-12 text-blue-600"
              {...fadeInUp}
            >
              アカウント登録すると？
            </motion.h2>
            <motion.ul
              className="grid md:grid-cols-3 gap-8"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
              }}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: Map, text: '新しいおでかけスポットを登録できる' },
                { icon: List, text: 'プロフィールを編集できる' },
                {
                  icon: MessageSquare,
                  text: 'おでかけスポットのレビューができる',
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  {...fadeInUp}
                >
                  <item.icon className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
                  <p className="text-center text-lg text-gray-700">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-center text-3xl font-bold mb-12 text-blue-600"
              {...fadeInUp}
            >
              下関ってどこ？
            </motion.h2>
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              {...fadeInUp}
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
                    onClick={() => router.push('/')}
                    variant="outline"
                    className="border-2 border-sky-400 text-sky-400 hover:bg-blue-50 hover:text-sky-500 font-semibold py-6 px-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    マップを見る <Map className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
