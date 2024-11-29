import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">利用規約</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>はじめに</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            本規約は，ユーザーとふくふくマップの提供者の間の利用条件を定めるものです。ユーザーは，本規約に従って当アプリを利用するものとします。
          </p>
        </CardContent>
      </Card>

      {[
        {
          title: '第1条（適用）',
          content: [
            '本規約は，ユーザーと当アプリの利用に関わる一切の関係に適用されるものとします。',
          ],
        },
        {
          title: '第2条（利用登録）',
          content: [
            '利用登録は申請者が規約に同意し、当アプリが承認することで完了します。',
            '虚偽申請や違反履歴がある場合、登録を承認しない場合があります。',
          ],
        },
        {
          title: '第3条（禁止事項）',
          content: [
            'ユーザーは，以下の行為をしてはなりません。',
            '1. 法令または公序良俗に違反する行為',
            '2. 犯罪行為に関連する行為',
            '4. サービス提供者，ほかのユーザー，またはその他第三者の権利を侵害する行為',
            '5. その他，サービス提供者が不適切と判断する行為',
          ],
        },
        {
          title: '第4条（画像の管理）',
          content: [
            '当アプリにアップロードする画像は、ユーザーが所有権をもつ画像に限ります。',
            '当アプリに掲載される画像の所有権は、画像の提供者にあります。',
            '掲載画像のダウンロードを禁止します。',
          ],
        },
        {
          title: '第5条（本アプリの提供の停止等）',
          content: [
            'メンテナンスや不可抗力によりアプリを停止する場合があります。',
            '停止による損害についてサービス提供者は責任を負いません。',
          ],
        },
        {
          title: '第6条（保証の否認および免責事項）',
          content: [
            '当アプリは，サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。',
            '当アプリの利用から生じたいかなる損害に対しても、サービス提供者の故意または重過失を除き、損害責任を負いません。',
            '当アプリは，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。',
          ],
        },
        {
          title: '第7条（サービス内容の変更等）',
          content: [
            '当アプリは，ユーザーへの事前の告知をもって、サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。',
          ],
        },
        {
          title: '第8条（利用規約の変更）',
          content: [
            '当アプリはユーザーの個別の同意を要せず、本規約を変更することができるものとします。',
            '変更後の本規約は、本サービス上での掲載をもって効力を発生するものとします。',
          ],
        },
        {
          title: '第9条（準拠法・裁判管轄）',
          content: ['本規約の解釈にあたっては，日本法を準拠法とします。'],
        },
      ].map((section, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-2">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
