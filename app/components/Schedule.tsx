'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../auth';
import {
  CalendarDays,
  Clock,
  Plane,
  Car,
  MapPin,
  Utensils,
  Hotel,
  Sun,
  Camera,
  Fish,
  Coffee,
  Palmtree,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StylishItinerary() {
  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-lg font-semibold text-gray-700">
              認証されていません
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const itinerary = [
    {
      date: '26日(土)',
      events: [
        { time: '8:00', event: '出発', icon: <Clock className="h-5 w-5" /> },
        {
          time: '10:00',
          event: 'エイてぃーパーキング入庫',
          icon: <Car className="h-5 w-5" />,
        },
        {
          time: '10:30',
          event: 'スカイマークチケット引き換え',
          icon: <Plane className="h-5 w-5" />,
        },
        {
          time: '12:35',
          event: '福岡空港　発',
          icon: <Plane className="h-5 w-5" />,
        },
        {
          time: '14:25',
          event: '那覇空港　着',
          icon: <Plane className="h-5 w-5" />,
        },
        {
          time: '15:00',
          event: 'ケーズレンタル那覇空港【東町店】',
          icon: <Car className="h-5 w-5" />,
        },
        {
          time: '16:00',
          event: '美浜アメリカンビレッジ到着',
          icon: <MapPin className="h-5 w-5" />,
        },
        {
          time: '17:30',
          event: 'THE　CALIF KITCHEN 沖縄店',
          icon: <Utensils className="h-5 w-5" />,
        },
        {
          time: '19:00',
          event: 'ホテル着',
          icon: <Hotel className="h-5 w-5" />,
        },
      ],
    },
    {
      date: '27日(日)',
      events: [
        {
          time: '7:00',
          event: 'ホテル、朝食',
          icon: <Coffee className="h-5 w-5" />,
        },
        { time: '8:30', event: '出発', icon: <Clock className="h-5 w-5" /> },
        {
          time: '9:30',
          event: 'ネオパークオキナワ',
          icon: <Palmtree className="h-5 w-5" />,
        },
        {
          time: '11:00',
          event: 'OKINAWAフルーツランド',
          icon: <Sun className="h-5 w-5" />,
        },
        { time: '?', event: '昼食', icon: <Utensils className="h-5 w-5" /> },
        { time: '?', event: '琉球村', icon: <MapPin className="h-5 w-5" /> },
        { time: '?', event: '夕食', icon: <Utensils className="h-5 w-5" /> },
      ],
    },
    {
      date: '28日(月)',
      events: [
        {
          time: '7:00',
          event: 'ホテル、朝食',
          icon: <Coffee className="h-5 w-5" />,
        },
        { time: '8:00', event: '出発', icon: <Clock className="h-5 w-5" /> },
        {
          time: '9:30',
          event: '美ら海水族館',
          icon: <Fish className="h-5 w-5" />,
        },
        {
          time: '11:00',
          event: '昼食',
          icon: <Utensils className="h-5 w-5" />,
        },
        { time: '13:00', event: '出発', icon: <Clock className="h-5 w-5" /> },
        {
          time: '15:00',
          event: '古宇利島オーシャンタワー',
          icon: <MapPin className="h-5 w-5" />,
        },
        { time: '?', event: '夕食', icon: <Utensils className="h-5 w-5" /> },
      ],
    },
    {
      date: '29日(火)',
      events: [
        {
          time: '7:00',
          event: 'ホテル、朝食',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '9:00',
          event: '沖縄ワールド',
          icon: <MapPin className="h-5 w-5" />,
        },
        {
          time: '10:00',
          event: '伝統工芸体験',
          icon: <Camera className="h-5 w-5" />,
        },
        {
          time: '10:30',
          event: 'スーパーエイサーショー',
          icon: <Camera className="h-5 w-5" />,
        },
        {
          time: '11:00',
          event: '昼食、国際通り',
          icon: <Utensils className="h-5 w-5" />,
        },
        {
          time: '12:00',
          event: 'レンタカー返却',
          icon: <Car className="h-5 w-5" />,
        },
        {
          time: '?',
          event: 'ランチ、空港',
          icon: <Utensils className="h-5 w-5" />,
        },
        {
          time: '13:40',
          event: '那覇空港　発',
          icon: <Plane className="h-5 w-5" />,
        },
        {
          time: '15:25',
          event: '福岡空港　着',
          icon: <Plane className="h-5 w-5" />,
        },
        {
          time: '16:30',
          event: 'ビッグパーキング出庫',
          icon: <Car className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-violet-100 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 md:h-6 md:w-6" />
            旅行スケジュール
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              {itinerary.map((day, index) => (
                <TabsTrigger
                  key={index}
                  value={`day${index + 1}`}
                  className="text-xs md:text-sm"
                >
                  {day.date.split('(')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            {itinerary.map((day, dayIndex) => (
              <TabsContent key={dayIndex} value={`day${dayIndex + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">
                      {day.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 md:space-y-6">
                      {day.events.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start ml-[-24px] md:ml-0"
                        >
                          <div className="flex-shrink-0 w-12 md:w-16 text-right mr-2 md:mr-4">
                            <span className="text-xs md:text-sm font-medium text-gray-500">
                              {item.time}
                            </span>
                          </div>
                          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full flex items-center justify-center text-white">
                            {item.icon}
                          </div>
                          <div className="ml-2 md:ml-4 flex-grow">
                            <div className="bg-white shadow-md rounded-lg p-2 md:p-3">
                              <p className="text-xs md:text-sm text-gray-800">
                                {item.event}
                              </p>
                            </div>
                            {index < day.events.length - 1 && (
                              <div className="h-full w-0.5 bg-gray-300 ml-4 mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
