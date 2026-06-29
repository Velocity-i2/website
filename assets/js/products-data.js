/* ==========================================================================
   Velocity Products Database
   ========================================================================== */

export const products = [
  {
    id: "wifi-timer-offline",
    name: "Wi-Fi Timer - Standalone Offline",
    category: "timers",
    badge: "Automation Timers",
    image: "/public/01.png",
    description: "A high-precision programmable timer switch with built-in Wi-Fi access point, enabling scheduling and cycles without needing any internet connection.",
    specs: {
      "Connectivity": "Standalone Wi-Fi AP (Direct Hotspot)",
      "Output Load": "1 Heavy-Duty Relay (16A / 230V AC)",
      "Hardware Clock": "DS3231 Temperature-Compensated RTC"
    }
  },
  {
    id: "wifi-timer-online",
    name: "Wi-Fi Timer - Internet Cloud Connected",
    category: "timers",
    badge: "Automation Timers",
    image: "/public/01.png",
    description: "An internet-enabled scheduling controller synchronizing with global NTP servers, supporting remote app scheduling and smart alerts via cloud dashboard.",
    specs: {
      "Wireless Standard": "2.4GHz Wi-Fi (NTP Server Sync)",
      "Protocols": "Secure MQTT / TLS / WebSockets",
      "Integration": "Web Dashboard & Mobile Responsive Control"
    }
  },
  {
    id: "wifi-cycling-timer",
    name: "Wi-Fi Cycling Timer Clock - Offline",
    category: "timers",
    badge: "Automation Timers",
    image: "/public/01.png",
    description: "An industrial interval cycling timer for automated pulse triggers and precision looping operations, easily configured via local Wi-Fi web portal.",
    specs: {
      "Timer Modes": "Cycle, Loop, Infinite Delay, Pulse-Trigger",
      "Precision": "Millisecond-level execution accuracy",
      "Schedule Memory": "Non-Volatile EEPROM (Saves state on power loss)"
    }
  },
  {
    id: "school-bell-timer",
    name: "Wi-Fi Base School Bell Timer",
    category: "timers",
    badge: "Automation Timers",
    image: "/public/01.png",
    description: "An automated bell scheduling system with built-in holiday planner, allowing standalone schedule management for institutions and factories.",
    specs: {
      "Events Capacity": "Up to 100 ring events/day with custom durations",
      "RTC Stability": "Battery-backed offline time sync (10-year life)",
      "Control Relay": "Dual isolated heavy-duty outputs"
    }
  },
  {
    id: "water-level-controller",
    name: "Wireless Water Level Controller",
    category: "controllers",
    badge: "Smart Controllers",
    image: "/public/01.png",
    description: "An intelligent automation system communicating wirelessly between ground tanks and overhead tanks across a solid 2-floor structure range.",
    specs: {
      "Wireless Tech": "Sub-GHz RF (Penetrates heavy RCC walls)",
      "Fail-Safes": "Dry run protection & overhead overflow preventer",
      "Sensor Probes": "Food-grade stainless steel magnetic sensors"
    }
  },
  {
    id: "temp-logger",
    name: "IoT Base Temperature Logger",
    category: "telemetry",
    badge: "Telemetry & Data",
    image: "/public/01.png",
    description: "A continuous thermal monitoring logger pushing real-time measurements directly to Google Sheets with automated reports and email triggers.",
    specs: {
      "Report Integration": "Direct Google Sheets logging & PDF reports generator",
      "Sensor Accuracy": "DS18B20 digital probe (-55°C to +125°C, ±0.5°C)",
      "Smart Alerts": "Instant alarm triggers over Email / WhatsApp API"
    }
  },
  {
    id: "data-transmitter",
    name: "Long Range Data Transmitter Pair",
    category: "telemetry",
    badge: "Telemetry & Data",
    image: "/public/01.png",
    description: "A reliable plug-and-play transmitter pair communicating RS485 half-duplex packets wire-free over a solid 3-kilometer line-of-sight range.",
    specs: {
      "Range Coverage": "Up to 3.0 KM (Line-of-Sight, LoRa Modulation)",
      "Interfaces": "RS485 Half-Duplex In/Out (Modbus RTU transparent)",
      "Security": "Hardware-level RF channel pairing & packet check"
    }
  }
];
