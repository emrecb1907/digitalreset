# Digital Reset 🧘‍♂️

30 günlük dijital detoks yolculuğunuz için tasarlanmış mobil uygulama. Günlük temizlik görevleri ve sağlıklı dijital alışkanlıklar oluşturmanıza yardımcı olur.

## 📱 Ekran Görüntüleri

| Ana Sayfa | Timeline | İstatistikler |
|-----------|----------|---------------|
| Günlük görevler | 30 günlük yolculuk | İlerleme takibi |

## ✨ Özellikler

- 📅 **30 Günlük Program** - Kişiselleştirilmiş dijital temizlik planı
- ✅ **Günlük Görevler** - Fotoğraf silme, uygulama kaldırma, takipten çıkma
- 🔥 **Seri Takibi** - Motivasyonunuzu artıran streak sistemi
- 📊 **İstatistikler** - İlerlemenizi görsel olarak takip edin
- 🌍 **Çoklu Dil** - Türkçe ve İngilizce desteği
- 🎨 **Modern UI** - Minimal ve şık tasarım

## 🛠️ Teknolojiler

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Router**: [Expo Router](https://expo.dev/router) v6
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Icons**: [Lucide React Native](https://lucide.dev/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **i18n**: [i18n-js](https://github.com/fnando/i18n-js)

## 🚀 Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Expo Go uygulaması (fiziksel cihaz için)

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

### Çalıştırma

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

## 📁 Proje Yapısı

```
digitalreset/
├── app/                    # Expo Router sayfaları
│   ├── (tabs)/             # Tab navigasyonu
│   │   ├── index.tsx       # Ana sayfa
│   │   ├── timeline.tsx    # 30 günlük timeline
│   │   └── stats.tsx       # İstatistikler
│   ├── onboarding/         # Onboarding akışı
│   ├── settings.tsx        # Ayarlar
│   └── paywall.tsx         # Premium ekranı
├── components/             # Yeniden kullanılabilir bileşenler
├── context/                # React Context'ler
│   └── LanguageContext.tsx # Dil yönetimi
├── lib/
│   ├── i18n/               # Çeviri dosyaları
│   │   ├── tr.ts           # Türkçe
│   │   └── en.ts           # İngilizce
│   └── utils.ts            # Yardımcı fonksiyonlar
└── assets/                 # Görsel ve ses dosyaları
```

## 🌐 Çoklu Dil Desteği

Uygulama Türkçe ve İngilizce destekler. Yeni dil eklemek için:

1. `lib/i18n/` klasörüne yeni dil dosyası ekleyin (örn: `de.ts`)
2. `lib/i18n/index.ts` dosyasında dili kaydedin
3. `LanguageContext.tsx`'te dil listesine ekleyin

## 📦 Deploy

### EAS Build

```bash
# iOS build
eas build --platform ios

# Android build
eas build --platform android
```

### EAS Submit

```bash
# App Store'a gönder
eas submit --platform ios

# Play Store'a gönder
eas submit --platform android
```

## 📄 Lisans

Bu proje özel kullanım içindir.

---

Made with ❤️ using Expo
