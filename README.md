# BMI Calculator Pro

A professional-grade, responsive Body Mass Index (BMI) calculator built with React, TypeScript, and Tailwind CSS. This application provides instant health insights, visual data representation, and historical tracking in a modern, user-friendly interface.

![BMI Calculator Preview](https://picsum.photos/seed/bmi-preview/800/400)

## 🚀 Features

-   **Dual Unit Support**: Seamlessly toggle between Metric (cm/kg) and Imperial (ft+in/lbs) systems.
-   **Instant Calculation**: Real-time BMI computation with precise rounding.
-   **Visual Feedback**:
    -   Color-coded result cards based on health categories (Underweight, Normal, Overweight, Obese).
    -   Dynamic meter bar showing exactly where you stand on the BMI spectrum.
-   **Health Insights**: Provides helpful context and health suggestions based on the calculated BMI.
-   **History Tracking**: Automatically saves your last 10 calculations using LocalStorage.
-   **Dark Mode**: Fully responsive dark/light theme toggle with system preference detection.
-   **Reference Charts**: Interactive bar charts to visualize BMI categories.
-   **Responsive Design**: Mobile-first architecture that looks great on all devices.

## 🛠️ Tech Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Motion](https://motion.dev/) (Framer Motion)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/bmi-calculator-pro.git
    cd bmi-calculator-pro
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

## 📂 Project Structure

```
/src
  ├── components/       # Reusable UI components
  │   ├── History.tsx
  │   ├── InputGroup.tsx
  │   ├── Meter.tsx
  │   ├── ReferenceChart.tsx
  │   ├── ResultCard.tsx
  │   └── ThemeToggle.tsx
  ├── utils/            # Helper functions and types
  │   ├── bmi.ts        # BMI calculation logic
  │   └── cn.ts         # Tailwind class merger
  ├── App.tsx           # Main application logic
  └── main.tsx          # Entry point
```

## 🎨 Customization

### Colors & Theme
The application uses Tailwind CSS variables for theming. You can customize the color palette in `src/index.css` or by modifying the Tailwind classes in the components.

### BMI Logic
The calculation logic is isolated in `src/utils/bmi.ts`. You can easily adjust the formula or category thresholds if needed.

## 📄 License

This project is licensed under the Apache-2.0 License - see the LICENSE file for details.

---

Built with ❤️ using React and Tailwind CSS.
