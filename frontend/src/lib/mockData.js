// export const products = [
//   {
//     id: 1,
//     name: 'VisionPro AI Camera',
//     slug: 'visionpro-ai-camera',
//     description: 'Advanced AI-powered camera system with real-time object detection and tracking capabilities.',
//     longDescription: 'VisionPro AI Camera combines cutting-edge computer vision algorithms with high-performance hardware to deliver real-time object detection, facial recognition, and behavior analysis. Perfect for security, retail analytics, and smart city applications.',
//     price: 109999,
//     status: 'Available',
//     category: 'Computer Vision',
//     image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       '4K resolution with 60fps processing',
//       'Real-time object detection (YOLO v8)',
//       'Edge AI processing with NVIDIA Jetson',
//       'Weather-resistant IP67 rating',
//       'Night vision with IR illumination',
//       'Cloud connectivity and local storage'
//     ],
//     techStack: ['Python', 'TensorFlow', 'OpenCV', 'CUDA', 'C++'],
//     useCases: [
//       'Smart retail analytics',
//       'Security and surveillance',
//       'Traffic monitoring',
//       'Industrial automation'
//     ]
//   },
//   {
//     id: 2,
//     name: 'SmartPCB Dev Kit',
//     slug: 'smartpcb-dev-kit',
//     description: 'Professional PCB development kit with modular sensors and IoT connectivity for rapid prototyping.',
//     longDescription: 'SmartPCB Dev Kit is a comprehensive hardware platform designed for engineers and makers. It features modular sensor interfaces, wireless connectivity options, and a powerful microcontroller for developing IoT solutions.',
//     price: 42499,
//     status: 'Available',
//     category: 'Electronics',
//     image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       'STM32 ARM Cortex-M4 MCU',
//       'WiFi and Bluetooth 5.0',
//       'Modular sensor ports (I2C, SPI, UART)',
//       'USB-C programming interface',
//       'Integrated power management',
//       'Open-source firmware and schematics'
//     ],
//     techStack: ['C/C++', 'Arduino', 'KiCAD', 'FreeRTOS'],
//     useCases: [
//       'IoT prototyping',
//       'Sensor networks',
//       'Home automation',
//       'Educational projects'
//     ]
//   },
//   {
//     id: 3,
//     name: 'AutoDrone X1',
//     slug: 'autodrone-x1',
//     description: 'Autonomous drone with AI navigation, obstacle avoidance, and 4K camera for aerial intelligence.',
//     longDescription: 'AutoDrone X1 represents the future of autonomous flight. Powered by advanced AI algorithms, it can navigate complex environments, avoid obstacles in real-time, and capture stunning 4K footage while executing autonomous missions.',
//     price: 212499,
//     status: 'In Development',
//     category: 'Automation',
//     image: 'https://images.pexels.com/photos/887828/pexels-photo-887828.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/887828/pexels-photo-887828.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       'Autonomous navigation with GPS and vision',
//       'Real-time obstacle detection and avoidance',
//       '4K camera with gimbal stabilization',
//       '45-minute flight time',
//       'Return-to-home failsafe',
//       'Mobile app control and mission planning'
//     ],
//     techStack: ['Python', 'ROS', 'OpenCV', 'MAVLink', 'C++'],
//     useCases: [
//       'Aerial surveying and mapping',
//       'Search and rescue operations',
//       'Agricultural monitoring',
//       'Infrastructure inspection'
//     ]
//   },
//   {
//     id: 4,
//     name: 'EdgeAI Processor',
//     slug: 'edgeai-processor',
//     description: 'Compact AI processing unit for edge computing with neural network acceleration.',
//     longDescription: 'EdgeAI Processor is a powerful edge computing solution that brings AI inference capabilities to resource-constrained environments. With dedicated neural network acceleration, it can run complex models with minimal latency.',
//     price: 67999,
//     status: 'Prototype',
//     category: 'AI Hardware',
//     image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       'Neural network accelerator (8 TOPS)',
//       'Low power consumption (5W typical)',
//       'USB 3.0 and Ethernet connectivity',
//       'TensorFlow Lite and ONNX support',
//       'Compact form factor',
//       'SDK and API for easy integration'
//     ],
//     techStack: ['Python', 'TensorFlow Lite', 'ONNX', 'C++'],
//     useCases: [
//       'Real-time video analytics',
//       'Industrial quality control',
//       'Smart home devices',
//       'Robotics applications'
//     ]
//   },
//   {
//     id: 5,
//     name: 'IoT Gateway Hub',
//     slug: 'iot-gateway-hub',
//     description: 'Universal IoT gateway supporting multiple protocols for seamless device integration.',
//     longDescription: 'IoT Gateway Hub acts as a central communication bridge for your IoT ecosystem. It supports multiple wireless protocols and provides secure, reliable connectivity between your devices and the cloud.',
//     price: 29699,
//     status: 'Available',
//     category: 'IoT',
//     image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       'Multi-protocol support (Zigbee, Z-Wave, BLE, WiFi)',
//       'Secure data encryption',
//       'Local processing and edge analytics',
//       'Cloud connectivity (MQTT, HTTP)',
//       'Web-based configuration interface',
//       'Expandable with plugin architecture'
//     ],
//     techStack: ['Node.js', 'MQTT', 'Docker', 'React'],
//     useCases: [
//       'Smart building automation',
//       'Industrial IoT networks',
//       'Home automation',
//       'Environmental monitoring'
//     ]
//   },
//   {
//     id: 6,
//     name: 'Vision Inspection System',
//     slug: 'vision-inspection-system',
//     description: 'Industrial-grade vision system for automated quality control and defect detection.',
//     longDescription: 'Vision Inspection System leverages deep learning and traditional computer vision techniques to perform high-speed quality control inspections. It can detect defects, measure dimensions, and verify assembly with precision.',
//     price: 424999,
//     status: 'Available',
//     category: 'Industrial',
//     image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
//     images: [
//       'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1000',
//       'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1000'
//     ],
//     features: [
//       'High-speed camera (120fps)',
//       'Precision lighting system',
//       'Deep learning defect detection',
//       'Measurement and metrology tools',
//       'Integration with factory systems',
//       'Real-time reporting dashboard'
//     ],
//     techStack: ['Python', 'PyTorch', 'OpenCV', 'C++', 'PLC Integration'],
//     useCases: [
//       'Manufacturing quality control',
//       'Pharmaceutical inspection',
//       'Electronics assembly verification',
//       'Food and beverage inspection'
//     ]
//   }
// ];

export const blogPosts = [
  {
    id: 1,
    slug: 'future-of-computer-vision-in-iot',
    title: 'The Future of Computer Vision in IoT Devices',
    excerpt: 'Exploring how computer vision is transforming IoT devices and enabling smarter, more responsive systems.',
    date: '2024-03-15',
    author: 'aniketxai',
    category: 'AI & Vision',
    readTime: '8 min',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
# The Future of Computer Vision in IoT Devices

Computer vision technology is rapidly evolving, and its integration with IoT devices is creating unprecedented opportunities for innovation. In this article, we'll explore how these technologies are converging to create smarter, more responsive systems.

## The Current State of Vision-Enabled IoT

Today's IoT devices are becoming increasingly sophisticated, with many incorporating camera sensors and basic image processing capabilities. However, the real transformation is happening at the intersection of edge computing and advanced AI algorithms.

### Key Developments

1. **Edge AI Processing**: Modern devices can now run complex neural networks locally, reducing latency and improving privacy.
2. **Multi-Modal Sensing**: Combining vision with other sensors creates more context-aware systems.
3. **Energy Efficiency**: New architectures enable vision processing with minimal power consumption.

## Applications Across Industries

### Smart Manufacturing
Vision-enabled IoT devices are revolutionizing quality control by detecting defects in real-time with accuracy surpassing human inspection.

### Healthcare
From patient monitoring to surgical assistance, computer vision is enhancing medical IoT devices and improving patient outcomes.

### Smart Cities
Traffic management, public safety, and infrastructure monitoring are being transformed by distributed vision systems.

## Challenges and Opportunities

While the potential is enormous, several challenges remain:
- Privacy concerns with always-on cameras
- Bandwidth limitations for video streaming
- Processing power constraints in edge devices
- Standardization across platforms

## Looking Ahead

The future promises even more exciting developments:
- **3D Vision**: Depth sensing becoming standard in IoT devices
- **Neuromorphic Computing**: Event-based vision sensors mimicking human perception
- **Federated Learning**: Collaborative model training while preserving privacy

As these technologies mature, we can expect computer vision to become as ubiquitous in IoT as wireless connectivity is today.
    `
  },
  {
    id: 2,
    slug: 'building-robust-pcb-designs',
    title: 'Building Robust PCB Designs for Industrial Applications',
    excerpt: 'Best practices and techniques for creating reliable PCB designs that withstand harsh industrial environments.',
    date: '2024-03-10',
    author: 'aniketxai',
    category: 'Hardware',
    readTime: '10 min',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
# Building Robust PCB Designs for Industrial Applications

Industrial environments present unique challenges for electronic systems. Temperature extremes, vibration, electromagnetic interference, and harsh chemicals can quickly destroy poorly designed circuits. Here's how to build PCBs that last.

## Design Considerations

### Environmental Factors

When designing for industrial applications, consider:
- Operating temperature range (-40°C to +85°C typical)
- Humidity and moisture exposure
- Vibration and mechanical stress
- EMI/EMC requirements
- Chemical exposure

### Component Selection

Choose components rated for industrial use:
- Extended temperature range parts
- Conformal coating compatibility
- High MTBF (Mean Time Between Failures)
- Automotive-grade when appropriate

## Layout Best Practices

### Power Integrity

Proper power distribution is critical:
- Use power planes for low impedance
- Place decoupling capacitors strategically
- Consider voltage drop across long traces
- Implement proper grounding schemes

### Signal Integrity

Maintain signal quality through:
- Controlled impedance traces for high-speed signals
- Proper termination techniques
- Guard traces for sensitive signals
- Differential pair routing

### Thermal Management

Heat kills electronics. Address thermal issues early:
- Thermal vias under power components
- Adequate copper pour for heat spreading
- Strategic component placement
- Consider heat sinks and active cooling

## Manufacturing for Reliability

### PCB Stackup

Choose the right stackup:
- Minimum 1.6mm thickness for mechanical strength
- Symmetric stackup to prevent warping
- Appropriate copper weight (2oz for high current)

### Protection Measures

1. **Conformal Coating**: Protects against moisture and contaminants
2. **Potting**: Ultimate protection for harsh environments
3. **ESD Protection**: TVS diodes on exposed interfaces
4. **Overvoltage Protection**: Protect against transients

## Testing and Validation

Thorough testing is essential:
- Environmental stress testing
- Accelerated life testing
- EMC compliance testing
- Mechanical shock and vibration testing

## Conclusion

Building industrial-grade PCBs requires attention to detail and experience. By following these guidelines and learning from each project, you can create reliable designs that perform in the toughest conditions.
    `
  },
  {
    id: 3,
    slug: 'ai-at-the-edge',
    title: 'AI at the Edge: Bringing Intelligence to IoT Devices',
    excerpt: 'How edge AI is transforming IoT devices by enabling real-time processing without cloud dependency.',
    date: '2024-03-05',
    author: 'aniketxai',
    category: 'AI & IoT',
    readTime: '12 min',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
# AI at the Edge: Bringing Intelligence to IoT Devices

The convergence of artificial intelligence and edge computing is revolutionizing how IoT devices operate. By processing data locally instead of sending it to the cloud, edge AI enables real-time responses, enhanced privacy, and reduced bandwidth costs.

## What is Edge AI?

Edge AI refers to running artificial intelligence algorithms locally on hardware devices, at the point where data is generated. This contrasts with traditional cloud-based AI, where data is sent to remote servers for processing.

### Benefits of Edge AI

1. **Reduced Latency**: Real-time processing without network delays
2. **Enhanced Privacy**: Sensitive data stays on device
3. **Lower Bandwidth Costs**: Less data transmission
4. **Improved Reliability**: Works without internet connectivity
5. **Scalability**: Distributed processing across devices

## Hardware for Edge AI

### Processing Options

Different hardware platforms suit different needs:

**Microcontrollers (MCUs)**
- Ultra-low power consumption
- Cost-effective for simple models
- Examples: STM32, ESP32

**Application Processors**
- Better performance for complex models
- Video processing capabilities
- Examples: Raspberry Pi, Qualcomm

**Dedicated AI Accelerators**
- Optimized for neural networks
- High performance per watt
- Examples: Google Edge TPU, Intel Movidius

### Memory Considerations

Edge devices have limited memory:
- Model optimization is crucial
- Quantization reduces model size
- Knowledge distillation for smaller models

## Software Framework

### Popular Frameworks

1. **TensorFlow Lite**: Google's edge ML framework
2. **ONNX Runtime**: Cross-platform inference
3. **PyTorch Mobile**: Facebook's mobile solution
4. **Apache TVM**: Compiler for edge devices

### Model Optimization

Techniques to make models edge-ready:
- **Quantization**: Reduce precision (FP32 to INT8)
- **Pruning**: Remove unnecessary connections
- **Knowledge Distillation**: Train smaller models
- **Neural Architecture Search**: Find efficient architectures

## Real-World Applications

### Smart Cameras

Vision AI at the edge enables:
- Real-time object detection
- Facial recognition
- Anomaly detection
- Privacy-preserving analytics

### Industrial IoT

Manufacturing benefits from:
- Predictive maintenance
- Quality control
- Process optimization
- Safety monitoring

### Healthcare Devices

Medical IoT with edge AI:
- Continuous health monitoring
- Fall detection
- Vital signs analysis
- Emergency alerts

## Implementation Challenges

### Technical Hurdles

- Limited computational resources
- Power constraints for battery devices
- Model accuracy vs. efficiency tradeoffs
- Thermal management

### Development Complexity

- Cross-platform compatibility
- Testing and validation
- Over-the-air updates
- Model versioning

## Best Practices

1. **Start Simple**: Begin with proven models
2. **Iterate**: Optimize based on real-world data
3. **Monitor Performance**: Track metrics in production
4. **Plan for Updates**: Enable model updates remotely
5. **Consider Hybrid**: Use edge + cloud when beneficial

## The Future of Edge AI

Emerging trends to watch:
- **Neuromorphic Computing**: Brain-inspired processors
- **Federated Learning**: Collaborative training at edge
- **5G Integration**: Enhanced edge capabilities
- **Tiny ML**: AI on microcontroller-class devices

## Conclusion

Edge AI is not just a trend—it's becoming the standard for intelligent IoT devices. As hardware becomes more capable and software more efficient, we'll see AI-powered decision-making moving closer to where data is generated, creating faster, more private, and more reliable systems.

The future of IoT is intelligent, and that intelligence lives at the edge.
    `
  },
  {
    id: 4,
    slug: 'automation-with-robotics',
    title: 'Automation with Robotics: From Concept to Production',
    excerpt: 'A comprehensive guide to developing robotic automation systems from initial concept through production deployment.',
    date: '2024-02-28',
    author: 'aniketxai',
    category: 'Automation',
    readTime: '15 min',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
# Automation with Robotics: From Concept to Production

Implementing robotic automation is a complex journey that requires careful planning, execution, and iteration. This guide walks through the entire process from initial concept to production deployment.

## Phase 1: Requirements and Planning

### Understanding the Problem

Before jumping to solutions:
- Identify pain points in current process
- Quantify metrics (cycle time, error rate, cost)
- Define success criteria
- Assess ROI potential

### Feasibility Study

Evaluate technical and business feasibility:
- Technical complexity assessment
- Available technology evaluation
- Cost-benefit analysis
- Risk assessment

## Phase 2: Design and Prototyping

### System Architecture

Design the complete system:
- Mechanical design
- Electrical systems
- Control architecture
- Software stack
- Integration interfaces

### Prototyping Approach

Build and test incrementally:
1. Proof of concept (PoC)
2. Engineering prototype
3. Pilot system
4. Production unit

### Key Technologies

**Sensors and Perception**
- Vision systems for guidance
- Force/torque sensors for interaction
- Proximity sensors for safety
- Encoders for position feedback

**Actuators and Motion**
- Servo motors for precise control
- Pneumatics for fast operation
- Hydraulics for high force
- Linear actuators for positioning

**Control Systems**
- PLCs for industrial control
- Real-time operating systems
- Motion controllers
- Safety systems

## Phase 3: Software Development

### Control Software

Develop robust control algorithms:
- Motion planning and control
- Sensor fusion
- State machines for logic
- Error handling and recovery

### Integration Layer

Connect all components:
- Device drivers
- Communication protocols
- Data logging
- Remote monitoring

### User Interface

Make it usable:
- Intuitive HMI design
- Configuration tools
- Diagnostics and troubleshooting
- Production monitoring

## Phase 4: Testing and Validation

### Testing Pyramid

1. **Unit Tests**: Individual components
2. **Integration Tests**: Component interactions
3. **System Tests**: Complete system behavior
4. **Acceptance Tests**: Real-world scenarios

### Performance Validation

Measure against requirements:
- Cycle time analysis
- Accuracy and repeatability
- Reliability testing (MTBF)
- Safety validation

## Phase 5: Deployment

### Site Preparation

Prepare the installation site:
- Physical space requirements
- Utilities and infrastructure
- Safety zones and guards
- Environmental controls

### Installation Process

1. Mechanical installation
2. Electrical connections
3. Software deployment
4. Calibration and commissioning

### Training

Ensure successful adoption:
- Operator training
- Maintenance training
- Troubleshooting procedures
- Documentation

## Phase 6: Optimization

### Continuous Improvement

Monitor and optimize:
- Collect performance data
- Identify bottlenecks
- Implement improvements
- Update procedures

### Maintenance Strategy

Plan for longevity:
- Preventive maintenance schedule
- Spare parts inventory
- Upgrade path
- Lifecycle management

## Common Pitfalls

Avoid these mistakes:
- Underestimating integration complexity
- Inadequate safety considerations
- Poor change management
- Insufficient testing
- Lack of operator involvement

## ROI Considerations

Calculate true return on investment:
- Direct cost savings
- Quality improvements
- Throughput increases
- Reduced labor costs
- Maintenance costs
- Training and support

## Case Study: Automated Assembly Line

A real-world example:

**Challenge**: Manual assembly of electronic devices, high error rate, slow cycle time

**Solution**:
- Vision-guided robotic assembly
- Automated testing stations
- Intelligent material handling

**Results**:
- 70% faster cycle time
- 95% reduction in defects
- 18-month ROI
- Improved worker safety

## The Future of Robotic Automation

Emerging trends:
- Collaborative robots (cobots)
- AI-powered adaptive control
- Digital twins for simulation
- Cloud robotics
- Autonomous mobile robots (AMRs)

## Conclusion

Successful robotic automation requires a systematic approach, combining mechanical engineering, electronics, software development, and process optimization. Start small, learn continuously, and scale progressively. The investment in proper planning and execution pays dividends in system reliability and performance.

Remember: The goal isn't just to automate, but to create a better, more efficient, and more reliable process.
    `
  }
];

export const services = [
  {
    id: 1,
    title: 'Computer Vision Solutions',
    icon: 'Eye',
    problem: 'Traditional systems lack real-time visual intelligence, leading to manual inspection, delayed decisions, and missed opportunities.',
    solution: 'We develop custom computer vision systems using state-of-the-art deep learning models for object detection, tracking, classification, and analysis.',
    useCase: 'Automated quality control in manufacturing, facial recognition for security, retail analytics, autonomous navigation',
    features: [
      'Real-time object detection and tracking',
      'Facial recognition and biometrics',
      'Optical character recognition (OCR)',
      'Defect detection and classification',
      'Scene understanding and segmentation',
      'Edge deployment optimization'
    ]
  },
  {
    id: 2,
    title: 'IoT & Embedded Systems',
    icon: 'Cpu',
    problem: 'Disconnected devices and legacy systems create data silos, limiting automation and intelligent decision-making.',
    solution: 'End-to-end IoT solutions from sensor integration to cloud connectivity, enabling smart, connected products and systems.',
    useCase: 'Smart home automation, industrial monitoring, environmental sensing, asset tracking',
    features: [
      'Custom firmware development',
      'Wireless connectivity (WiFi, BLE, LoRa)',
      'Sensor integration and data acquisition',
      'Low-power optimization',
      'Cloud and edge computing integration',
      'OTA updates and remote management'
    ]
  },
  {
    id: 3,
    title: 'PCB Design & Prototyping',
    icon: 'Zap',
    problem: 'Standard off-the-shelf solutions don\'t meet specific requirements, and custom hardware development is complex and risky.',
    solution: 'Professional PCB design services from schematic capture to manufacturing, ensuring reliable and cost-effective hardware solutions.',
    useCase: 'Custom sensor boards, motor controllers, power electronics, signal processing circuits',
    features: [
      'Schematic design and simulation',
      'Multi-layer PCB layout (up to 12 layers)',
      'High-speed and RF design',
      'DFM (Design for Manufacturing) optimization',
      'Prototyping and testing',
      'Small to medium volume production support'
    ]
  },
  {
    id: 4,
    title: 'Custom Web Dashboards',
    icon: 'BarChart3',
    problem: 'Complex data scattered across systems makes it difficult to monitor operations, analyze trends, and make informed decisions.',
    solution: 'Interactive web dashboards and data visualization platforms that bring all your data together in real-time.',
    useCase: 'Production monitoring, IoT device management, analytics platforms, control panels',
    features: [
      'Real-time data visualization',
      'Custom charts and graphs',
      'Responsive and mobile-friendly',
      'User authentication and access control',
      'API integration',
      'Export and reporting capabilities'
    ]
  }
];

export const cartItems = [
  {
    id: 1,
    productId: 1,
    name: 'VisionPro AI Camera',
    price: 109999,
    quantity: 1,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    productId: 2,
    name: 'SmartPCB Dev Kit',
    price: 42499,
    quantity: 2,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];
