// Modern Agriculture Assistant JavaScript
class AgriSmartAI {
    constructor() {
        this.chatHistory = [];
        this.currentImage = null;
        this.isThinking = false;
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.userLocation = 'Salem, Tamil Nadu, India';
        this.userPreferences = {
            crop: null,
            soilType: null,
            farmSize: null,
            experience: 'beginner'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.setupTabNavigation();
        this.initializeWeather();
        this.setupInputSuggestions();
        this.showWelcomeMessage();
    }

    initializeKnowledgeBase() {
        return {
            crops: {
                rice: {
                    season: 'Kharif (June-July)',
                    soilType: 'Clay-loam, well-drained',
                    waterRequirement: 'High (1200-1500mm)',
                    duration: '90-120 days',
                    phRange: '5.5-6.5',
                    temperature: '20-35°C',
                    spacing: '20cm x 15cm',
                    fertilizer: 'N:P:K = 120:60:40 kg/ha',
                    commonPests: ['Brown planthopper', 'Stem borer', 'Leaf folder'],
                    commonDiseases: ['Blast', 'Bacterial blight', 'Sheath blight'],
                    expectedYield: '4-6 tons/ha',
                    marketPrice: '₹20-25/kg'
                },
                wheat: {
                    season: 'Rabi (October-December)',
                    soilType: 'Well-drained loamy soil',
                    waterRequirement: 'Moderate (450-600mm)',
                    duration: '110-130 days',
                    phRange: '6.0-7.5',
                    temperature: '15-25°C',
                    spacing: '22.5cm row spacing',
                    fertilizer: 'N:P:K = 120:60:40 kg/ha',
                    commonPests: ['Aphids', 'Termites', 'Army worm'],
                    commonDiseases: ['Rust', 'Smut', 'Bunt'],
                    expectedYield: '3.5-5 tons/ha',
                    marketPrice: '₹22-28/kg'
                },
                tomato: {
                    season: 'Year-round (avoid extreme weather)',
                    soilType: 'Well-drained sandy loam',
                    waterRequirement: 'Moderate-High (600-800mm)',
                    duration: '70-100 days',
                    phRange: '6.0-7.0',
                    temperature: '18-25°C',
                    spacing: '60cm x 45cm',
                    fertilizer: 'N:P:K = 150:75:75 kg/ha',
                    commonPests: ['Whitefly', 'Thrips', 'Fruit borer'],
                    commonDiseases: ['Early blight', 'Late blight', 'Mosaic virus'],
                    expectedYield: '25-40 tons/ha',
                    marketPrice: '₹15-30/kg'
                },
                cotton: {
                    season: 'Kharif (May-June)',
                    soilType: 'Deep black cotton soil',
                    waterRequirement: 'Moderate (600-1000mm)',
                    duration: '150-180 days',
                    phRange: '5.8-8.0',
                    temperature: '21-35°C',
                    spacing: '90cm x 45cm',
                    fertilizer: 'N:P:K = 120:60:60 kg/ha',
                    commonPests: ['Bollworm', 'Aphids', 'Whitefly'],
                    commonDiseases: ['Wilt', 'Root rot', 'Leaf curl virus'],
                    expectedYield: '15-20 quintals/ha',
                    marketPrice: '₹50-65/kg'
                }
            },

            soilTypes: {
                clay: {
                    characteristics: 'Heavy texture, high water retention, nutrient-rich',
                    advantages: ['Excellent nutrient retention', 'Good water storage', 'Rich in minerals'],
                    challenges: ['Poor drainage', 'Hard when dry', 'Slow warming', 'Compaction issues'],
                    suitableCrops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane'],
                    improvements: ['Add organic matter', 'Create raised beds', 'Install drainage tiles', 'Avoid working when wet'],
                    testingMethods: ['Jar test', 'Feel method', 'Professional soil analysis']
                },
                loam: {
                    characteristics: 'Balanced texture, ideal for most crops',
                    advantages: ['Good drainage and retention', 'Easy to work', 'Excellent for root development'],
                    challenges: ['May need regular organic matter', 'Can vary in fertility'],
                    suitableCrops: ['Most vegetables', 'Fruits', 'Cereals', 'Pulses'],
                    improvements: ['Regular compost addition', 'Cover cropping', 'Balanced fertilization'],
                    testingMethods: ['Standard soil test', 'pH testing', 'Organic matter analysis']
                },
                sandy: {
                    characteristics: 'Light texture, excellent drainage, quick warming',
                    advantages: ['Easy cultivation', 'Good aeration', 'Quick warming', 'Low disease pressure'],
                    challenges: ['Poor water retention', 'Nutrient leaching', 'Low organic matter'],
                    suitableCrops: ['Root vegetables', 'Melons', 'Groundnut', 'Early vegetables'],
                    improvements: ['Frequent irrigation', 'Organic matter addition', 'Mulching', 'Slow-release fertilizers'],
                    testingMethods: ['Percolation test', 'Water holding capacity', 'Nutrient analysis']
                }
            },

            pests: {
                aphids: {
                    identification: 'Small, soft-bodied insects, green/black color',
                    symptoms: ['Curled leaves', 'Yellowing', 'Honeydew secretion', 'Sooty mold'],
                    lifecycle: '7-10 days, multiple generations per year',
                    treatment: ['Neem oil spray', 'Insecticidal soap', 'Predatory insects', 'Reflective mulch'],
                    prevention: ['Regular monitoring', 'Companion planting', 'Avoid over-fertilization'],
                    severity: 'Medium to High'
                },
                whitefly: {
                    identification: 'Tiny white flying insects, found on leaf undersides',
                    symptoms: ['Yellow sticky honeydew', 'Leaf yellowing', 'Stunted growth', 'Virus transmission'],
                    lifecycle: '15-30 days depending on temperature',
                    treatment: ['Yellow sticky traps', 'Neem oil', 'Beneficial insects', 'Reflective mulch'],
                    prevention: ['Early detection', 'Crop rotation', 'Remove infected plants'],
                    severity: 'High'
                },
                bollworm: {
                    identification: 'Caterpillars with stripes, bore into fruits/bolls',
                    symptoms: ['Entry holes in fruits', 'Frass around holes', 'Damaged bolls', 'Premature fruit drop'],
                    lifecycle: '30-45 days, 4-6 generations per year',
                    treatment: ['Pheromone traps', 'Bt spray', 'Nuclear polyhedrosis virus', 'Hand picking'],
                    prevention: ['Proper field sanitation', 'Destroy crop residue', 'Early planting'],
                    severity: 'Very High'
                }
            },

            diseases: {
                blight: {
                    type: 'Fungal',
                    identification: 'Dark spots with concentric rings on leaves',
                    symptoms: ['Brown/black spots', 'Yellowing around spots', 'Defoliation', 'Fruit lesions'],
                    conditions: 'High humidity, moderate temperatures (20-25°C)',
                    treatment: ['Copper fungicide', 'Chlorothalonil', 'Mancozeb', 'Remove affected parts'],
                    prevention: ['Crop rotation', 'Proper spacing', 'Drip irrigation', 'Resistant varieties'],
                    severity: 'High'
                },
                rust: {
                    type: 'Fungal',
                    identification: 'Orange/reddish pustules on leaves',
                    symptoms: ['Rust-colored spots', 'Leaf yellowing', 'Premature defoliation', 'Reduced yield'],
                    conditions: 'Cool, moist weather with dew',
                    treatment: ['Systemic fungicides', 'Sulfur spray', 'Remove affected leaves'],
                    prevention: ['Resistant varieties', 'Good air circulation', 'Avoid overhead irrigation'],
                    severity: 'Medium to High'
                },
                wilt: {
                    type: 'Fungal/Bacterial',
                    identification: 'Sudden wilting despite adequate moisture',
                    symptoms: ['Wilting leaves', 'Yellowing', 'Stunted growth', 'Vascular browning'],
                    conditions: 'Soil-borne, favored by high temperature and moisture',
                    treatment: ['Soil drenching with fungicide', 'Remove infected plants', 'Soil solarization'],
                    prevention: ['Resistant varieties', 'Crop rotation', 'Well-drained soil', 'Seed treatment'],
                    severity: 'Very High'
                }
            },

            fertilizers: {
                nitrogen: {
                    role: 'Promotes vegetative growth and leaf development',
                    deficiencySymptoms: ['Yellowing of older leaves', 'Stunted growth', 'Poor tillering'],
                    sources: ['Urea (46% N)', 'Ammonium sulfate (21% N)', 'CAN (25% N)', 'Organic compost'],
                    application: ['Split application', 'Basal + top dressing', 'Foliar spray for quick effect'],
                    timing: ['Basal at planting', 'Top dress at active growth stages'],
                    precautions: ['Avoid over-application', 'Don\'t apply during flowering for some crops']
                },
                phosphorus: {
                    role: 'Root development, flowering, and fruit formation',
                    deficiencySymptoms: ['Purple discoloration', 'Poor root growth', 'Delayed flowering'],
                    sources: ['DAP (46% P2O5)', 'SSP (16% P2O5)', 'Rock phosphate', 'Bone meal'],
                    application: ['Full dose at planting', 'Band placement near roots'],
                    timing: ['Apply at sowing/transplanting', 'Before flowering stage'],
                    precautions: ['Less mobile in soil', 'Apply near root zone']
                },
                potassium: {
                    role: 'Disease resistance, water regulation, fruit quality',
                    deficiencySymptoms: ['Brown leaf margins', 'Weak stems', 'Poor fruit quality'],
                    sources: ['MOP (60% K2O)', 'SOP (50% K2O)', 'Wood ash', 'Potassium nitrate'],
                    application: ['Split application', 'Soil application', 'Foliar spray'],
                    timing: ['Basal + fruit development stage', 'During stress periods'],
                    precautions: ['High chloride content in MOP may affect some crops']
                }
            }
        };
    }

    setupEventListeners() {
        // Chat functionality
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        document.getElementById('messageInput').addEventListener('input', this.autoResizeTextarea);

        // Topic cards
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const question = card.dataset.question;
                this.askQuestion(question);
            });
        });

        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.askQuestion(question);
            });
        });

        // Image upload
        document.getElementById('imageUploadBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });

        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });

        // Toolbar buttons
        document.getElementById('voiceBtn').addEventListener('click', () => this.toggleVoiceInput());
        document.getElementById('locationBtn').addEventListener('click', () => this.addLocationToQuery());

        // Chat actions
        document.getElementById('newChatBtn').addEventListener('click', () => this.startNewChat());
        document.getElementById('clearChat').addEventListener('click', () => this.clearChat());
        document.getElementById('exportChat').addEventListener('click', () => this.exportChat());

        // Crop selector
        document.getElementById('cropSelector').addEventListener('change', (e) => {
            this.userPreferences.crop = e.target.value;
            this.updateInputSuggestions();
        });
    }

    setupTabNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const tabContents = document.querySelectorAll('.tab-content');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetTab = item.dataset.tab;
                
                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Update tab content
                tabContents.forEach(tab => tab.classList.remove('active'));
                document.getElementById(targetTab).classList.add('active');
                
                // Load tab-specific content
                this.loadTabContent(targetTab);
            });
        });
    }

    loadTabContent(tab) {
        switch(tab) {
            case 'knowledge':
                this.loadKnowledgeBase();
                break;
            case 'tools':
                this.loadFarmTools();
                break;
            case 'weather':
                this.loadWeatherData();
                break;
        }
    }

    autoResizeTextarea(e) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    askQuestion(question) {
        document.getElementById('messageInput').value = question;
        this.sendMessage();
    }

    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message && !this.currentImage) return;
        
        // Clear input and disable send button
        input.value = '';
        input.style.height = 'auto';
        this.toggleSendButton(false);
        
        // Add user message
        this.addMessage('user', message);
        
        // Handle image if present
        if (this.currentImage) {
            this.addMessage('user', 'I\'ve uploaded an image for analysis.', this.currentImage);
            this.currentImage = null;
            document.getElementById('imageInput').value = '';
        }
        
        // Show thinking indicator
        this.showThinkingIndicator('Analyzing your question step by step...');
        
        try {
            // Generate AI response with delay for realism
            await this.delay(2000 + Math.random() * 2000);
            const response = await this.generateEnhancedResponse(message);
            this.hideThinkingIndicator();
            this.addMessage('assistant', response);
            
            // Save to history
            this.saveChatToHistory(message, response);
            
        } catch (error) {
            this.hideThinkingIndicator();
            this.addMessage('assistant', this.getErrorResponse());
        }
        
        this.toggleSendButton(true);
        this.updateInputSuggestions();
    }

    addMessage(type, content, image = null) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        // Hide welcome message
        const welcomeSection = messagesContainer.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }
        
        // Create avatar
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'user' ? '👤' : '🤖';
        
        // Create content
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        
        // Add image if present
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.style.maxWidth = '200px';
            imgElement.style.borderRadius = '8px';
            imgElement.style.marginTop = '10px';
            imgElement.style.cursor = 'pointer';
            imgElement.onclick = () => this.showImageModal(image);
            messageContent.appendChild(imgElement);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to chat history
        this.chatHistory.push({ type, content, timestamp: Date.now(), image });
    }

    showThinkingIndicator(text = 'Analyzing your question...') {
        const indicator = document.getElementById('thinkingIndicator');
        const textElement = document.getElementById('thinkingText');
        textElement.textContent = text;
        indicator.style.display = 'flex';
        this.isThinking = true;
        
        // Animate thinking text
        this.animateThinkingText();
    }

    hideThinkingIndicator() {
        const indicator = document.getElementById('thinkingIndicator');
        indicator.style.display = 'none';
        this.isThinking = false;
    }

    animateThinkingText() {
        if (!this.isThinking) return;
        
        const texts = [
            'Analyzing your question...',
            'Consulting agricultural database...',
            'Evaluating crop conditions...',
            'Generating personalized recommendations...',
            'Cross-referencing best practices...',
            'Preparing detailed analysis...'
        ];
        
        let index = 0;
        const textElement = document.getElementById('thinkingText');
        
        const interval = setInterval(() => {
            if (!this.isThinking) {
                clearInterval(interval);
                return;
            }
            
            index = (index + 1) % texts.length;
            textElement.textContent = texts[index];
        }, 1500);
    }

    async generateEnhancedResponse(query) {
        if (!query) {
            return this.generateImageAnalysisResponse();
        }
        
        const lowerQuery = query.toLowerCase();
        const selectedCrop = this.userPreferences.crop;
        
        // Initialize response components
        let response = '';
        
        // Add personalized greeting based on context
        if (this.chatHistory.length <= 2) {
            response += this.getPersonalizedGreeting();
        }
        
        // Analysis section
        response += this.createAnalysisSection(
            'Step-by-Step Analysis Process',
            '🔍',
            this.getAnalysisSteps(query)
        );
        
        // Main content based on query type
        if (this.isAboutCrops(lowerQuery)) {
            response += await this.generateCropAdvice(lowerQuery, selectedCrop);
        } else if (this.isAboutSoil(lowerQuery)) {
            response += await this.generateSoilAdvice(lowerQuery);
        } else if (this.isAboutPests(lowerQuery)) {
            response += await this.generatePestAdvice(lowerQuery);
        } else if (this.isAboutDiseases(lowerQuery)) {
            response += await this.generateDiseaseAdvice(lowerQuery);
        } else if (this.isAboutFertilizers(lowerQuery)) {
            response += await this.generateFertilizerAdvice(lowerQuery);
        } else if (this.isAboutWeather(lowerQuery)) {
            response += await this.generateWeatherAdvice(lowerQuery);
        } else if (this.isAboutIrrigation(lowerQuery)) {
            response += await this.generateIrrigationAdvice(lowerQuery);
        } else if (this.isAboutMarket(lowerQuery)) {
            response += await this.generateMarketAdvice(lowerQuery);
        } else {
            response += await this.generateGeneralAdvice(lowerQuery);
        }
        
        // Add next steps
        response += this.createNextStepsSection(lowerQuery);
        
        // Add personalized recommendations
        response += this.createPersonalizedRecommendations(lowerQuery);
        
        return response;
    }

    getPersonalizedGreeting() {
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';
        
        if (hour < 12) timeGreeting = 'Good morning';
        else if (hour < 17) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';
        
        return `<div class="greeting-section">
            <p><strong>${timeGreeting}!</strong> I'm excited to help you with your farming question. Let me provide you with a comprehensive analysis.</p>
        </div>`;
    }

    getAnalysisSteps(query) {
        const steps = [
            `<strong>Query Understanding:</strong> Analyzing "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`,
            `<strong>Context Assessment:</strong> Considering your location (${this.userLocation}) and current season`,
            `<strong>Database Search:</strong> Consulting agricultural research and best practices`,
            `<strong>Personalization:</strong> Tailoring recommendations to your specific needs`,
            `<strong>Solution Generation:</strong> Creating actionable step-by-step guidance`
        ];
        
        return this.createStepList(steps);
    }

    isAboutCrops(query) {
        const cropKeywords = ['crop', 'plant', 'grow', 'variety', 'seed', 'harvest', 'yield', 'cultivation'];
        return cropKeywords.some(keyword => query.includes(keyword));
    }

    isAboutSoil(query) {
        const soilKeywords = ['soil', 'ph', 'fertility', 'nutrients', 'clay', 'sandy', 'loam', 'compost'];
        return soilKeywords.some(keyword => query.includes(keyword));
    }

    isAboutPests(query) {
        const pestKeywords = ['pest', 'insect', 'bug', 'aphid', 'caterpillar', 'control', 'infestation'];
        return pestKeywords.some(keyword => query.includes(keyword));
    }

    isAboutDiseases(query) {
        const diseaseKeywords = ['disease', 'blight', 'fungus', 'virus', 'infection', 'rot', 'wilt', 'spots'];
        return diseaseKeywords.some(keyword => query.includes(keyword));
    }

    isAboutFertilizers(query) {
        const fertilizerKeywords = ['fertilizer', 'nutrient', 'nitrogen', 'phosphorus', 'potassium', 'npk', 'feed'];
        return fertilizerKeywords.some(keyword => query.includes(keyword));
    }

    isAboutWeather(query) {
        const weatherKeywords = ['weather', 'rain', 'drought', 'temperature', 'climate', 'season', 'monsoon'];
        return weatherKeywords.some(keyword => query.includes(keyword));
    }

    isAboutIrrigation(query) {
        const irrigationKeywords = ['water', 'irrigation', 'drip', 'sprinkler', 'schedule', 'watering'];
        return irrigationKeywords.some(keyword => query.includes(keyword));
    }

    isAboutMarket(query) {
        const marketKeywords = ['price', 'market', 'sell', 'profit', 'cost', 'economics', 'income'];
        return marketKeywords.some(keyword => query.includes(keyword));
    }

    async generateCropAdvice(query, selectedCrop) {
        let response = '';
        
        if (query.includes('best') && (query.includes('crop') || query.includes('plant'))) {
            response += this.createRecommendationBox(
                'Crop Selection Strategy',
                this.getCropSelectionAdvice(query)
            );
        }
        
        if (selectedCrop && this.knowledgeBase.crops[selectedCrop]) {
            const cropData = this.knowledgeBase.crops[selectedCrop];
            response += this.createInfoGrid([
                { header: '🌱 Planting Season', content: cropData.season },
                { header: '🌍 Soil Type', content: cropData.soilType },
                { header: '💧 Water Need', content: cropData.waterRequirement },
                { header: '⏱️ Duration', content: cropData.duration },
                { header: '📊 Expected Yield', content: cropData.expectedYield },
                { header: '💰 Market Price', content: cropData.marketPrice }
            ]);
        }
        
        response += this.getSeasonalGuidance();
        
        return response;
    }

    getCropSelectionAdvice(query) {
        if (query.includes('clay')) {
            return `
                <strong>For Clay Soil:</strong><br>
                • <strong>Rice:</strong> Excellent water retention matches rice needs<br>
                • <strong>Wheat:</strong> Deep roots can penetrate clay effectively<br>
                • <strong>Cotton:</strong> Thrives in black cotton soil<br>
                • <strong>Sugarcane:</strong> Benefits from high nutrient retention<br><br>
                <strong>Clay Soil Management Tips:</strong><br>
                • Add organic compost to improve structure<br>
                • Create raised beds for better drainage<br>
                • Avoid working when soil is wet
            `;
        } else if (query.includes('sandy')) {
            return `
                <strong>For Sandy Soil:</strong><br>
                • <strong>Root Vegetables:</strong> Carrots, radishes, potatoes<br>
                • <strong>Melons:</strong> Watermelon, muskmelon<br>
                • <strong>Groundnut:</strong> Prefers well-drained conditions<br>
                • <strong>Early Vegetables:</strong> Quick-growing leafy greens<br><br>
                <strong>Sandy Soil Management:</strong><br>
                • Frequent, light irrigation<br>
                • Heavy mulching to retain moisture<br>
                • Regular organic matter additions
            `;
        }
        
        return this.getGeneralCropSelection();
    }

    getGeneralCropSelection() {
        const currentMonth = new Date().getMonth() + 1;
        let seasonalAdvice = '';
        
        if (currentMonth >= 6 && currentMonth <= 9) {
            seasonalAdvice = `
                <strong>Current Season (Kharif):</strong><br>
                • Rice, Maize, Cotton, Sugarcane<br>
                • Pulses: Arhar, Moong, Urad<br>
                • Oilseeds: Soybean, Sunflower<br>
                • Fodder crops for livestock
            `;
        } else if (currentMonth >= 10 || currentMonth <= 3) {
            seasonalAdvice = `
                <strong>Current Season (Rabi):</strong><br>
                • Wheat, Barley, Oats<br>
                • Gram, Lentil, Pea<br>
                • Mustard, Safflower<br>
                • Winter vegetables
            `;
        } else {
            seasonalAdvice = `
                <strong>Current Season (Zaid):</strong><br>
                • Fodder crops<br>
                • Summer vegetables<br>
                • Watermelon, Muskmelon<br>
                • Green fodder for animals
            `;
        }
        
        return seasonalAdvice;
    }

    getSeasonalGuidance() {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        
        let guidance = '<div class="seasonal-guidance">';
        guidance += '<h4>🗓️ Current Seasonal Recommendations</h4>';
        
        if (month >= 6 && month <= 9) {
            guidance += `
                <div class="season-info">
                    <strong>Monsoon Season (Kharif) - Current Focus:</strong><br>
                    • Monitor rainfall and adjust planting accordingly<br>
                    • Ensure proper drainage to prevent waterlogging<br>
                    • Apply pre-emergence herbicides for weed control<br>
                    • Regular pest monitoring due to high humidity
                </div>
            `;
        } else if (month >= 10 || month <= 3) {
            guidance += `
                <div class="season-info">
                    <strong>Winter Season (Rabi) - Current Focus:</strong><br>
                    • Take advantage of cool weather for optimal growth<br>
                    • Monitor for frost warnings and protect sensitive crops<br>
                    • Reduce watering frequency but maintain soil moisture<br>
                    • Plan for harvest and post-harvest storage
                </div>
            `;
        } else {
            guidance += `
                <div class="season-info">
                    <strong>Summer Season (Zaid) - Current Focus:</strong><br>
                    • Focus on heat-tolerant and quick-maturing crops<br>
                    • Implement efficient irrigation systems<br>
                    • Use shade nets and mulching to reduce heat stress<br>
                    • Plan for next season's crop preparation
                </div>
            `;
        }
        
        guidance += '</div>';
        return guidance;
    }

    async generateSoilAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Soil Analysis and Recommendations',
            '🌱',
            `<p>Based on your query about soil management, here's my comprehensive analysis:</p>
            ${this.createStepList([
                'Identifying soil type and characteristics from your description',
                'Analyzing current soil conditions and potential issues',
                'Recommending specific soil improvement strategies',
                'Providing testing methods for soil health assessment',
                'Suggesting suitable crops for your soil type'
            ])}`
        );
        
        if (query.includes('test') || query.includes('ph')) {
            response += this.createRecommendationBox(
                'Soil Testing Protocol',
                `
                <strong>Essential Soil Tests:</strong><br>
                • <strong>pH Test:</strong> Use digital meter or test strips (₹500-2000)<br>
                • <strong>NPK Analysis:</strong> Professional lab testing (₹300-800)<br>
                • <strong>Organic Matter:</strong> Walkley-Black method<br>
                • <strong>Micronutrients:</strong> DTPA extraction method<br><br>
                <strong>DIY Testing Methods:</strong><br>
                • <strong>Jar Test:</strong> Shake soil with water, let settle to see layers<br>
                • <strong>Percolation Test:</strong> Dig hole, fill with water, time drainage<br>
                • <strong>pH Indicator Plants:</strong> Hydrangeas change color based on pH
                `
            );
        }
        
        if (query.includes('improve') || query.includes('fertility')) {
            response += this.getSoilImprovementAdvice(query);
        }
        
        response += this.createInfoGrid([
            { header: '🧪 Ideal pH Range', content: '6.0-7.5 for most crops' },
            { header: '🍃 Organic Matter', content: '3-5% is optimal' },
            { header: '💧 Water Holding', content: 'Should retain but not waterlog' },
            { header: '🌬️ Aeration', content: 'Good pore space essential' }
        ]);
        
        return response;
    }

    getSoilImprovementAdvice(query) {
        return this.createRecommendationBox(
            'Soil Improvement Action Plan',
            `
            <strong>Phase 1: Assessment (Week 1-2)</strong><br>
            • Conduct comprehensive soil testing<br>
            • Identify main limiting factors<br>
            • Determine organic matter content<br><br>
            
            <strong>Phase 2: Amendment (Week 3-8)</strong><br>
            • Add compost (2-3 inches annually)<br>
            • Apply lime if pH < 6.0, sulfur if pH > 7.5<br>
            • Incorporate organic amendments before planting<br><br>
            
            <strong>Phase 3: Maintenance (Ongoing)</strong><br>
            • Regular organic matter additions<br>
            • Cover cropping during off-season<br>
            • Minimize soil compaction<br>
            • Monitor and adjust based on crop performance
            `
        );
    }

    async generatePestAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Integrated Pest Management Analysis',
            '🛡',
            `<p>Analyzing pest-related concerns using IPM principles:</p>
            ${this.createStepList([
                'Identifying pest species and lifecycle stage',
                'Assessing economic threshold and damage level',
                'Evaluating biological, cultural, and chemical controls',
                'Developing integrated management strategy',
                'Planning monitoring and follow-up actions'
            ])}`
        );
        
        if (query.includes('identify') || query.includes('what')) {
            response += this.createPestIdentificationGuide();
        }
        
        response += this.createRecommendationBox(
            'Integrated Pest Management Strategy',
            `
            <strong>Prevention (First Priority):</strong><br>
            • Crop rotation to break pest cycles<br>
            • Resistant varieties when available<br>
            • Proper field sanitation<br>
            • Beneficial insect habitat creation<br><br>
            
            <strong>Monitoring (Continuous):</strong><br>
            • Weekly field scouting<br>
            • Pheromone traps for early detection<br>
            • Economic threshold assessment<br>
            • Weather-based pest prediction<br><br>
            
            <strong>Control (When Needed):</strong><br>
            • Biological: Release beneficial insects<br>
            • Mechanical: Traps, barriers, hand-picking<br>
            • Chemical: Selective pesticides as last resort
            `
        );
        
        response += this.createWarningBox(
            'Important Precautions',
            `• Always read and follow pesticide labels<br>
             • Use protective equipment during application<br>
             • Respect pre-harvest intervals<br>
             • Avoid spraying during bee activity periods<br>
             • Rotate pesticide modes of action to prevent resistance`
        );
        
        return response;
    }

    createPestIdentificationGuide() {
        return this.createInfoGrid([
            { 
                header: '🐛 Aphids', 
                content: 'Small, soft-bodied, green/black insects on young shoots and leaves. Cause leaf curling and honeydew secretion.' 
            },
            { 
                header: '🦋 Whiteflies', 
                content: 'Tiny white flying insects on leaf undersides. Cause yellowing and virus transmission.' 
            },
            { 
                header: '🐛 Thrips', 
                content: 'Tiny, slender insects causing silver streaks on leaves. Most active during hot, dry weather.' 
            },
            { 
                header: '🐛 Caterpillars', 
                content: 'Various species bore into fruits, stems, or eat leaves. Look for entry holes and frass.' 
            }
        ]);
    }

    async generateDiseaseAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Disease Diagnosis and Management',
            '🦠',
            `<p>Systematic approach to disease identification and control:</p>
            ${this.createStepList([
                'Symptom analysis and pattern recognition',
                'Environmental factor assessment',
                'Pathogen identification (fungal, bacterial, or viral)',
                'Disease triangle evaluation (host, pathogen, environment)',
                'Integrated disease management planning'
            ])}`
        );
        
        if (query.includes('spots') || query.includes('blight')) {
            response += this.createDiseaseIdentificationGuide();
        }
        
        response += this.createRecommendationBox(
            'Disease Management Protocol',
            `
            <strong>Prevention Strategies:</strong><br>
            • Use certified, disease-free seeds<br>
            • Implement crop rotation (3-4 year cycle)<br>
            • Ensure proper plant spacing for air circulation<br>
            • Avoid overhead irrigation when possible<br>
            • Remove and destroy infected plant debris<br><br>
            
            <strong>Cultural Practices:</strong><br>
            • Plant resistant varieties when available<br>
            • Optimize planting time to avoid disease-favorable conditions<br>
            • Maintain proper nutrition (avoid excess nitrogen)<br>
            • Improve soil drainage<br><br>
            
            <strong>Treatment Options:</strong><br>
            • Organic: Neem oil, copper fungicides, beneficial microbes<br>
            • Chemical: Systemic and contact fungicides (rotate modes of action)<br>
            • Biological: Trichoderma, Bacillus species applications
            `
        );
        
        return response;
    }

    createDiseaseIdentificationGuide() {
        return this.createInfoGrid([
            { 
                header: '🟤 Blight', 
                content: 'Dark spots with concentric rings, often with yellow halos. Spreads rapidly in humid conditions.' 
            },
            { 
                header: '🟠 Rust', 
                content: 'Orange-brown pustules on leaves, stems. Most common in cool, moist weather.' 
            },
            { 
                header: '⚪ Powdery Mildew', 
                content: 'White, powdery coating on leaves. Thrives in warm, dry days and cool nights.' 
            },
            { 
                header: '🟫 Wilt', 
                content: 'Sudden wilting despite adequate moisture. Vascular discoloration visible in stems.' 
            }
        ]);
    }

    async generateFertilizerAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Nutrient Management Analysis',
            '🧪',
            `<p>Comprehensive fertilizer recommendation based on crop needs and soil conditions:</p>
            ${this.createStepList([
                'Soil nutrient analysis and deficiency identification',
                'Crop-specific nutrient requirement calculation',
                'Fertilizer source selection and timing optimization',
                'Application method and rate determination',
                'Monitoring and adjustment planning'
            ])}`
        );
        
        if (query.includes('organic')) {
            response += this.getOrganicFertilizerAdvice();
        } else {
            response += this.getGeneralFertilizerAdvice();
        }
        
        response += this.createNutrientDeficiencyGuide();
        
        return response;
    }

    getOrganicFertilizerAdvice() {
        return this.createRecommendationBox(
            'Organic Fertilizer Program',
            `
            <strong>Compost Preparation (3-6 months):</strong><br>
            • Mix green (3 parts) and brown (1 part) materials<br>
            • Maintain moisture at 50-60%<br>
            • Turn every 2-3 weeks<br>
            • Ready when dark, crumbly, and earthy-smelling<br><br>
            
            <strong>Application Schedule:</strong><br>
            • <strong>Basal:</strong> Apply 5-10 tons compost per hectare before planting<br>
            • <strong>Top Dress:</strong> Apply liquid organic fertilizer every 15 days<br>
            • <strong>Foliar:</strong> Seaweed extract spray during vegetative growth<br><br>
            
            <strong>Specialized Organic Sources:</strong><br>
            • <strong>Nitrogen:</strong> Neem cake, fish emulsion, blood meal<br>
            • <strong>Phosphorus:</strong> Bone meal, rock phosphate<br>
            • <strong>Potassium:</strong> Wood ash, kelp meal, granite dust
            `
        );
    }

    getGeneralFertilizerAdvice() {
        return this.createRecommendationBox(
            'Balanced Fertilizer Program',
            `
            <strong>Soil Test-Based Application:</strong><br>
            • Get soil tested every 2-3 years<br>
            • Apply fertilizers based on soil nutrient status<br>
            • Consider crop removal rates<br><br>
            
            <strong>Split Application Strategy:</strong><br>
            • <strong>Basal (50%):</strong> Apply before or at planting<br>
            • <strong>First Top Dress (30%):</strong> At active tillering/branching<br>
            • <strong>Second Top Dress (20%):</strong> At flowering/fruit development<br><br>
            
            <strong>Common NPK Ratios:</strong><br>
            • <strong>Leafy Vegetables:</strong> 4:2:3 (high N for foliage)<br>
            • <strong>Fruiting Crops:</strong> 2:3:4 (high P & K for fruits)<br>
            • <strong>Root Crops:</strong> 2:4:3 (high P for root development)
            `
        );
    }

    createNutrientDeficiencyGuide() {
        return this.createInfoGrid([
            { 
                header: '🟡 Nitrogen Deficiency', 
                content: 'Yellowing of older leaves, stunted growth, poor tillering. Apply urea or ammonium sulfate.' 
            },
            { 
                header: '🟣 Phosphorus Deficiency', 
                content: 'Purple discoloration, poor root growth, delayed maturity. Apply DAP or SSP.' 
            },
            { 
                header: '🟤 Potassium Deficiency', 
                content: 'Brown leaf margins, weak stems, poor fruit quality. Apply MOP or SOP.' 
            },
            { 
                header: '🟡 Iron Deficiency', 
                content: 'Yellowing between leaf veins (young leaves). Apply iron chelate or ferrous sulfate.' 
            }
        ]);
    }

    async generateWeatherAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Weather-Based Agricultural Planning',
            '🌤️',
            `<p>Weather impact assessment and adaptive farming strategies:</p>
            ${this.createStepList([
                'Current weather pattern analysis',
                'Short and long-term forecast evaluation',
                'Crop-specific weather requirement matching',
                'Risk assessment for weather-related challenges',
                'Adaptive management strategy development'
            ])}`
        );
        
        // Get current weather impact
        response += await this.getCurrentWeatherImpact();
        
        response += this.createRecommendationBox(
            'Weather-Adaptive Farming Strategies',
            `
            <strong>Monsoon Management:</strong><br>
            • Ensure proper field drainage systems<br>
            • Apply fungicides preventively during high humidity<br>
            • Harvest mature crops before heavy rains<br>
            • Store seeds and fertilizers in moisture-proof containers<br><br>
            
            <strong>Drought Preparedness:</strong><br>
            • Install efficient irrigation systems (drip/sprinkler)<br>
            • Use mulching to conserve soil moisture<br>
            • Select drought-tolerant varieties<br>
            • Implement rainwater harvesting<br><br>
            
            <strong>Extreme Weather Response:</strong><br>
            • Monitor weather forecasts daily<br>
            • Have emergency action plans ready<br>
            • Maintain crop insurance coverage<br>
            • Diversify crops to spread risk
            `
        );
        
        return response;
    }

    async getCurrentWeatherImpact() {
        // Simulated weather impact analysis
        const currentMonth = new Date().getMonth() + 1;
        let weatherAdvice = '';
        
        if (currentMonth >= 6 && currentMonth <= 9) {
            weatherAdvice = `
                <div class="weather-impact">
                    <h4>🌧️ Current Monsoon Impact Analysis</h4>
                    <p><strong>Positive Impacts:</strong> Good soil moisture for kharif crops, reduced irrigation costs, favorable for rice cultivation</p>
                    <p><strong>Challenges:</strong> Risk of waterlogging, increased pest and disease pressure, delayed field operations</p>
                    <p><strong>Immediate Actions:</strong> Monitor drainage, apply preventive fungicides, ensure proper plant spacing</p>
                </div>
            `;
        } else if (currentMonth >= 10 || currentMonth <= 2) {
            weatherAdvice = `
                <div class="weather-impact">
                    <h4>❄️ Current Winter Impact Analysis</h4>
                    <p><strong>Positive Impacts:</strong> Cool weather favors rabi crops, lower pest pressure, good for crop quality</p>
                    <p><strong>Challenges:</strong> Risk of frost damage, slower growth rates, limited water availability</p>
                    <p><strong>Immediate Actions:</strong> Monitor frost warnings, adjust irrigation, plan harvest timing</p>
                </div>
            `;
        }
        
        return weatherAdvice;
    }

    async generateIrrigationAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Smart Irrigation Planning',
            '💧',
            `<p>Water management optimization based on crop needs and efficiency:</p>
            ${this.createStepList([
                'Crop water requirement calculation',
                'Soil water holding capacity assessment',
                'Irrigation system efficiency evaluation',
                'Scheduling optimization for maximum efficiency',
                'Water conservation strategy development'
            ])}`
        );
        
        response += this.createRecommendationBox(
            'Efficient Irrigation Schedule',
            `
            <strong>Daily Water Requirements (mm/day):</strong><br>
            • <strong>Rice:</strong> 8-10 mm (standing water maintained)<br>
            • <strong>Wheat:</strong> 4-6 mm (depending on growth stage)<br>
            • <strong>Vegetables:</strong> 5-8 mm (higher during fruit development)<br>
            • <strong>Cotton:</strong> 5-7 mm (critical during flowering)<br><br>
            
            <strong>Optimal Irrigation Timing:</strong><br>
            • <strong>Early Morning (6-8 AM):</strong> Minimal evaporation losses<br>
            • <strong>Evening (4-6 PM):</strong> Good for foliar applications<br>
            • <strong>Avoid Midday:</strong> High evaporation and leaf burning<br><br>
            
            <strong>Irrigation Indicators:</strong><br>
            • Soil moisture at 2-3 inch depth<br>
            • Plant stress symptoms (wilting, leaf color)<br>
            • Tensiometer readings (if available)<br>
            • Weather forecast consideration
            `
        );
        
        response += this.createIrrigationSystemComparison();
        
        return response;
    }

    createIrrigationSystemComparison() {
        return this.createInfoGrid([
            { 
                header: '💧 Drip Irrigation', 
                content: 'Efficiency: 90-95%. Best for: Row crops, orchards. Water saving: 30-50%. Cost: ₹40,000-80,000/acre' 
            },
            { 
                header: '🚿 Sprinkler System', 
                content: 'Efficiency: 75-85%. Best for: Field crops, vegetables. Water saving: 20-40%. Cost: ₹25,000-50,000/acre' 
            },
            { 
                header: '🌊 Surface Irrigation', 
                content: 'Efficiency: 60-70%. Best for: Paddy, large fields. Traditional method. Cost: ₹5,000-15,000/acre' 
            },
            { 
                header: '💦 Micro-sprinklers', 
                content: 'Efficiency: 80-90%. Best for: Orchards, nurseries. Good coverage. Cost: ₹35,000-70,000/acre' 
            }
        ]);
    }

    async generateMarketAdvice(query) {
        let response = '';
        
        response += this.createAnalysisSection(
            'Market Intelligence and Economics',
            '📈',
            `<p>Agricultural market analysis and profit optimization:</p>
            ${this.createStepList([
                'Current market price trend analysis',
                'Demand-supply pattern evaluation',
                'Seasonal price variation assessment',
                'Value addition opportunity identification',
                'Marketing strategy development'
            ])}`
        );
        
        response += this.createRecommendationBox(
            'Market-Driven Crop Planning',
            `
            <strong>High-Value Crops (Current Market Trends):</strong><br>
            • <strong>Exotic Vegetables:</strong> Broccoli, Capsicum, Cherry tomatoes<br>
            • <strong>Spices:</strong> Turmeric, Ginger, Cardamom<br>
            • <strong>Medicinal Plants:</strong> Aloe vera, Ashwagandha, Tulsi<br>
            • <strong>Fruits:</strong> Dragon fruit, Avocado, Blueberries<br><br>
            
            <strong>Value Addition Opportunities:</strong><br>
            • Processing: Dehydration, juicing, pickling<br>
            • Direct marketing: Farmer's markets, online sales<br>
            • Certification: Organic, GAP certification<br>
            • Contract farming: Tie-ups with food companies<br><br>
            
            <strong>Market Intelligence Sources:</strong><br>
            • eNAM (National Agriculture Market)<br>
            • AGMARKNET portal<br>
            • Local mandi price updates<br>
            • Export-import data analysis
            `
        );
        
        response += this.createProfitabilityAnalysis();
        
        return response;
    }

    createProfitabilityAnalysis() {
        return this.createInfoGrid([
            { 
                header: '🌾 Cereals', 
                content: 'Investment: ₹25,000/acre. Returns: ₹40,000/acre. Net Profit: ₹15,000. ROI: 60%' 
            },
            { 
                header: '🥬 Vegetables', 
                content: 'Investment: ₹50,000/acre. Returns: ₹120,000/acre. Net Profit: ₹70,000. ROI: 140%' 
            },
            { 
                header: '🌿 Spices', 
                content: 'Investment: ₹40,000/acre. Returns: ₹100,000/acre. Net Profit: ₹60,000. ROI: 150%' 
            },
            { 
                header: '🍇 Fruits', 
                content: 'Investment: ₹80,000/acre. Returns: ₹150,000/acre. Net Profit: ₹70,000. ROI: 88%' 
            }
        ]);
    }

    async generateGeneralAdvice(query) {
        let response = '';
        
        response += this.createRecommendationBox(
            'Comprehensive Agricultural Guidance',
            `
            I understand you're asking about "${query}". Let me provide you with comprehensive guidance:<br><br>
            
            <strong>Key Areas to Consider:</strong><br>
            • <strong>Crop Selection:</strong> Choose varieties suited to your soil and climate<br>
            • <strong>Soil Health:</strong> Regular testing and organic matter enhancement<br>
            • <strong>Water Management:</strong> Efficient irrigation and conservation<br>
            • <strong>Pest Control:</strong> Integrated approach with regular monitoring<br>
            • <strong>Market Planning:</strong> Research demand and price trends<br><br>
            
            <strong>Best Practices for Success:</strong><br>
            • Keep detailed farm records<br>
            • Stay updated with agricultural research<br>
            • Network with successful farmers<br>
            • Consider sustainable farming practices<br>
            • Plan for climate variability
            `
        );
        
        response += this.createInfoGrid([
            { 
                header: '📚 Learn More', 
                content: 'Access agricultural extension services, attend farmer training programs' 
            },
            { 
                header: '🤝 Connect', 
                content: 'Join farmer producer organizations, cooperatives for better market access' 
            },
            { 
                header: '💡 Innovate', 
                content: 'Adopt new technologies, precision farming techniques' 
            },
            { 
                header: '🌱 Sustain', 
                content: 'Focus on long-term soil health and environmental conservation' 
            }
        ]);
        
        return response;
    }

    createNextStepsSection(query) {
        const steps = [
            'Monitor your crop conditions daily',
            'Implement the recommended practices gradually',
            'Keep records of what works best for your conditions',
            'Consult local agricultural experts for specific guidance',
            'Plan for the next growing season based on results'
        ];
        
        return `
            <div class="next-steps-section">
                <h4>📋 Your Action Plan - Next Steps</h4>
                ${this.createStepList(steps)}
            </div>
        `;
    }

    createPersonalizedRecommendations(query) {
        const location = this.userLocation;
        const season = this.getCurrentSeason();
        
        return `
            <div class="personalized-recommendations">
                <h4>🎯 Personalized for ${location}</h4>
                <p><strong>Current Season:</strong> ${season}</p>
                <p><strong>Location-Specific Tips:</strong></p>
                <ul>
                    <li>Consider local climate patterns and rainfall distribution</li>
                    <li>Connect with nearby agricultural universities for research updates</li>
                    <li>Join local farmer WhatsApp groups for real-time market information</li>
                    <li>Visit nearby KVK (Krishi Vigyan Kendra) for hands-on training</li>
                </ul>
                
                <div class="follow-up">
                    <p><strong>Need More Help?</strong> Ask me follow-up questions about:</p>
                    <div class="follow-up-topics">
                        <button class="topic-suggestion" onclick="agriBot.askQuestion('How do I implement this advice step by step?')">Implementation Steps</button>
                        <button class="topic-suggestion" onclick="agriBot.askQuestion('What are the costs involved?')">Cost Analysis</button>
                        <button class="topic-suggestion" onclick="agriBot.askQuestion('Any seasonal variations to consider?')">Seasonal Considerations</button>
                    </div>
                </div>
            </div>
        `;
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 6 && month <= 9) return 'Kharif (Monsoon)';
        if (month >= 10 || month <= 3) return 'Rabi (Winter)';
        return 'Zaid (Summer)';
    }

    generateImageAnalysisResponse() {
        return this.createAnalysisSection(
            'Image Analysis Process',
            '📸',
            `<p>I can help you analyze agricultural images! Here's how:</p>
            ${this.createStepList([
                'Upload a clear, well-lit image of your crop, soil, or pest issue',
                'I\'ll analyze the visual symptoms and patterns',
                'Compare with agricultural databases for identification',
                'Provide specific diagnosis and treatment recommendations',
                'Suggest follow-up monitoring and preventive measures'
            ])}
            
            <p><strong>For best results, please describe:</strong></p>
            <ul>
                <li>What crop or plant is shown</li>
                <li>What specific problem you're seeing</li>
                <li>When you first noticed the issue</li>
                <li>Any recent weather or treatment history</li>
            </ul>`
        );
    }

    // Utility functions for creating formatted responses
    createAnalysisSection(title, icon, content) {
        return `
            <div class="analysis-section">
                <div class="analysis-header">
                    <span class="analysis-icon">${icon}</span>
                    ${title}
                </div>
                ${content}
            </div>
        `;
    }

    createStepList(steps) {
        let stepHtml = '<div class="step-list">';
        steps.forEach((step, index) => {
            stepHtml += `
                <div class="step-item">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">${step}</div>
                </div>
            `;
        });
        stepHtml += '</div>';
        return stepHtml;
    }

    createRecommendationBox(title, content) {
        return `
            <div class="recommendation-box">
                <div class="recommendation-header">
                    🎯 ${title}
                </div>
                <div class="recommendation-content">${content}</div>
            </div>
        `;
    }

    createWarningBox(title, content) {
        return `
            <div class="warning-box">
                <div class="warning-header">
                    ⚠️ ${title}
                </div>
                <div class="warning-content">${content}</div>
            </div>
        `;
    }

    createInfoGrid(items) {
        let gridHtml = '<div class="info-grid">';
        items.forEach(item => {
            gridHtml += `
                <div class="info-card">
                    <div class="info-card-header">${item.header}</div>
                    <div class="info-card-content">${item.content}</div>
                </div>
            `;
        });
        gridHtml += '</div>';
        return gridHtml;
    }

    getErrorResponse() {
        return this.createWarningBox(
            'Temporary Issue',
            'I\'m experiencing a temporary issue processing your request. Please try again, or rephrase your question. I\'m here to help with all your agricultural needs!'
        );
    }

    // Image handling
    handleImageUpload(file) {
        if (!file) return;
        
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('Image size too large. Please select an image under 10MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            this.showImagePreview(this.currentImage);
            document.getElementById('imageUploadBtn').style.background = 'var(--primary-green)';
            document.getElementById('imageUploadBtn').style.color = 'white';
        };
        reader.readAsDataURL(file);
    }

    showImagePreview(imageSrc) {
        // You could add a small preview in the input area
        console.log('Image uploaded and ready for analysis');
    }

    showImageModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const imageAnalysis = document.getElementById('imageAnalysis');
        
        modalImage.src = imageSrc;
        imageAnalysis.textContent = 'Analyzing image for agricultural insights...';
        modal.style.display = 'flex';
        
        // Simulate image analysis
        setTimeout(() => {
            imageAnalysis.innerHTML = `
                <strong>Image Analysis Results:</strong><br>
                • Image quality: Good for analysis<br>
                • Detected elements: Plant/crop material<br>
                • Suggested focus: Describe specific symptoms or issues you see<br>
                • Recommendation: Please provide context about what concerns you see
            `;
        }, 2000);
    }

    closeImageModal() {
        document.getElementById('imageModal').style.display = 'none';
    }

    // Voice input functionality
    toggleVoiceInput() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';
            
            const voiceBtn = document.getElementById('voiceBtn');
            voiceBtn.style.background = 'var(--accent-orange)';
            voiceBtn.style.color = 'white';
            voiceBtn.textContent = '🎙️';
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('messageInput').value = transcript;
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                voiceBtn.textContent = '🎤';
            };
            
            recognition.onerror = () => {
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                voiceBtn.textContent = '🎤';
                alert('Voice recognition failed. Please try typing your question.');
            };
            
            recognition.onend = () => {
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                voiceBtn.textContent = '🎤';
            };
            
            recognition.start();
        } else {
            alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        }
    }

    addLocationToQuery() {
        const currentQuery = document.getElementById('messageInput').value;
        const locationQuery = currentQuery + (currentQuery ? ' ' : '') + `in ${this.userLocation}`;
        document.getElementById('messageInput').value = locationQuery;
    }

    // Chat management
    startNewChat() {
        this.chatHistory = [];
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = '';
        this.showWelcomeMessage();
        this.currentImage = null;
        document.getElementById('imageUploadBtn').style.background = '';
        document.getElementById('imageUploadBtn').style.color = '';
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the current chat?')) {
            this.startNewChat();
        }
    }

    exportChat() {
        const chatData = {
            timestamp: new Date().toISOString(),
            location: this.userLocation,
            messages: this.chatHistory
        };
        
        const dataStr = JSON.stringify(chatData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `agrismart_chat_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    saveChatToHistory(question, response) {
        const chatItem = {
            id: Date.now(),
            question: question.substring(0, 50) + (question.length > 50 ? '...' : ''),
            timestamp: new Date().toLocaleString(),
            fullQuestion: question,
            fullResponse: response
        };
        
        let savedChats = JSON.parse(localStorage.getItem('agrismart_chats') || '[]');
        savedChats.unshift(chatItem);
        savedChats = savedChats.slice(0, 10); // Keep only last 10 chats
        localStorage.setItem('agrismart_chats', JSON.stringify(savedChats));
        
        this.updateChatHistoryUI();
    }

    loadChatHistory() {
        this.updateChatHistoryUI();
    }

    updateChatHistoryUI() {
        const historyList = document.getElementById('chatHistoryList');
        const savedChats = JSON.parse(localStorage.getItem('agrismart_chats') || '[]');
        
        historyList.innerHTML = '';
        savedChats.forEach(chat => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div style="font-weight: 500; margin-bottom: 4px;">${chat.question}</div>
                <div style="font-size: 0.8rem; color: var(--gray-500);">${chat.timestamp}</div>
            `;
            historyItem.onclick = () => this.loadChatFromHistory(chat);
            historyList.appendChild(historyItem);
        });
    }

    loadChatFromHistory(chat) {
        this.startNewChat();
        this.addMessage('user', chat.fullQuestion);
        this.addMessage('assistant', chat.fullResponse);
    }

    showWelcomeMessage() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = `
            <div class="welcome-section">
                <div class="welcome-avatar">🌾</div>
                <div class="welcome-content">
                    <h2>Welcome to AgriSmart AI Assistant!</h2>
                    <p>I'm your intelligent farming companion, ready to provide step-by-step analysis and personalized recommendations.</p>
                    <div class="feature-highlights">
                        <div class="feature-item">
                            <span class="feature-icon">🧠</span>
                            <div>
                                <strong>Smart Analysis</strong>
                                <p>Detailed reasoning for all agricultural recommendations</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">📊</span>
                            <div>
                                <strong>Data-Driven Insights</strong>
                                <p>Evidence-based farming advice from agricultural research</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎯</span>
                            <div>
                                <strong>Personalized Solutions</strong>
                                <p>Customized to your location, crops, and farming conditions</p>
                            </div>
                        </div>
                    </div>
                    <div class="example-questions">
                        <h4>Try asking me:</h4>
                        <div class="example-grid">
                            <button class="example-btn" onclick="agriBot.askQuestion('What is the best planting schedule for tomatoes in my region?')">
                                "What's the best planting schedule for tomatoes in my region?"
                            </button>
                            <button class="example-btn" onclick="agriBot.askQuestion('My wheat crop has yellow spots on leaves, help me identify the problem')">
                                "My wheat has yellow spots on leaves, what could be wrong?"
                            </button>
                            <button class="example-btn" onclick="agriBot.askQuestion('How can I improve my clay soil for better crop yield?')">
                                "How do I improve clay soil for better yields?"
                            </button>
                            <button class="example-btn" onclick="agriBot.askQuestion('Create an integrated pest management plan for my vegetable garden')">
                                "Help me create a pest management plan"
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Input suggestions
    setupInputSuggestions() {
        const messageInput = document.getElementById('messageInput');
        const suggestionsContainer = document.getElementById('inputSuggestions');
        
        messageInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 3) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            const suggestions = this.generateInputSuggestions(query);
            if (suggestions.length > 0) {
                this.showInputSuggestions(suggestions);
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-container')) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    generateInputSuggestions(query) {
        const suggestions = [
            'How to test soil pH and improve soil health?',
            'Best crops for current season in my region',
            'Organic pest control methods for vegetables',
            'Irrigation schedule for wheat crop',
            'Fertilizer recommendations for tomato plants',
            'How to identify plant diseases from symptoms?',
            'Market prices and profitable crops',
            'Weather-based farming recommendations',
            'Seed rate calculation for different crops',
            'Post-harvest storage techniques'
        ];
        
        return suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query)
        ).slice(0, 5);
    }

    showInputSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('inputSuggestions');
        suggestionsContainer.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.onclick = () => {
                document.getElementById('messageInput').value = suggestion;
                suggestionsContainer.style.display = 'none';
            };
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        suggestionsContainer.style.display = 'block';
    }

    updateInputSuggestions() {
        // Update suggestions based on selected crop or other preferences
        // This could be expanded to provide more contextual suggestions
    }

    toggleSendButton(enabled) {
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.disabled = !enabled;
        if (enabled) {
            sendBtn.classList.remove('loading');
        } else {
            sendBtn.classList.add('loading');
        }
    }

    // Knowledge Base functionality
    loadKnowledgeBase() {
        const knowledgeContent = document.getElementById('knowledgeContent');
        if (knowledgeContent.innerHTML.trim() === '') {
            knowledgeContent.innerHTML = `
                <div class="knowledge-welcome">
                    <h3>🌱 Agricultural Knowledge Base</h3>
                    <p>Click on any category above to explore detailed information about crops, soil management, pest control, and more.</p>
                    <div class="knowledge-stats">
                        <div class="stat-item">
                            <div class="stat-number">${Object.keys(this.knowledgeBase.crops).length}</div>
                            <div class="stat-label">Crop Varieties</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${Object.keys(this.knowledgeBase.pests).length + Object.keys(this.knowledgeBase.diseases).length}</div>
                            <div class="stat-label">Pest & Diseases</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${Object.keys(this.knowledgeBase.soilTypes).length}</div>
                            <div class="stat-label">Soil Types</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Set up category click handlers
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.loadCategoryContent(category);
            });
        });
    }

    loadCategoryContent(category) {
        const knowledgeContent = document.getElementById('knowledgeContent');
        let content = '';
        
        switch(category) {
            case 'crops':
                content = this.generateCropsKnowledge();
                break;
            case 'soil':
                content = this.generateSoilKnowledge();
                break;
            case 'pests':
                content = this.generatePestsKnowledge();
                break;
            case 'irrigation':
                content = this.generateIrrigationKnowledge();
                break;
            case 'fertilizers':
                content = this.generateFertilizersKnowledge();
                break;
            case 'equipment':
                content = this.generateEquipmentKnowledge();
                break;
        }
        
        knowledgeContent.innerHTML = content;
    }

    generateCropsKnowledge() {
        let content = '<div class="knowledge-category"><h3>🌾 Crops & Varieties</h3>';
        
        Object.entries(this.knowledgeBase.crops).forEach(([cropName, cropData]) => {
            content += `
                <div class="knowledge-item">
                    <h4>${cropName.charAt(0).toUpperCase() + cropName.slice(1)}</h4>
                    <div class="knowledge-details">
                        <div><strong>Season:</strong> ${cropData.season}</div>
                        <div><strong>Duration:</strong> ${cropData.duration}</div>
                        <div><strong>Soil:</strong> ${cropData.soilType}</div>
                        <div><strong>Water:</strong> ${cropData.waterRequirement}</div>
                        <div><strong>Expected Yield:</strong> ${cropData.expectedYield}</div>
                        <div><strong>Market Price:</strong> ${cropData.marketPrice}</div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        return content;
    }

    generateSoilKnowledge() {
        let content = '<div class="knowledge-category"><h3>🌱 Soil Management</h3>';
        
        Object.entries(this.knowledgeBase.soilTypes).forEach(([soilType, soilData]) => {
            content += `
                <div class="knowledge-item">
                    <h4>${soilType.charAt(0).toUpperCase() + soilType.slice(1)} Soil</h4>
                    <div class="knowledge-details">
                        <div><strong>Characteristics:</strong> ${soilData.characteristics}</div>
                        <div><strong>Advantages:</strong> ${soilData.advantages.join(', ')}</div>
                        <div><strong>Challenges:</strong> ${soilData.challenges.join(', ')}</div>
                        <div><strong>Suitable Crops:</strong> ${soilData.suitableCrops.join(', ')}</div>
                        <div><strong>Improvements:</strong> ${soilData.improvements.join(', ')}</div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        return content;
    }

    generatePestsKnowledge() {
        let content = '<div class="knowledge-category"><h3>🛡 Pest & Disease Control</h3>';
        
        Object.entries(this.knowledgeBase.pests).forEach(([pestName, pestData]) => {
            content += `
                <div class="knowledge-item">
                    <h4>${pestName.charAt(0).toUpperCase() + pestName.slice(1)}</h4>
                    <div class="knowledge-details">
                        <div><strong>Identification:</strong> ${pestData.identification}</div>
                        <div><strong>Symptoms:</strong> ${pestData.symptoms.join(', ')}</div>
                        <div><strong>Treatment:</strong> ${pestData.treatment.join(', ')}</div>
                        <div><strong>Prevention:</strong> ${pestData.prevention.join(', ')}</div>
                        <div><strong>Severity:</strong> ${pestData.severity}</div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        return content;
    }

    generateIrrigationKnowledge() {
        return `
            <div class="knowledge-category">
                <h3>💧 Water Management</h3>
                <div class="knowledge-item">
                    <h4>Irrigation Methods</h4>
                    <div class="knowledge-details">
                        <div><strong>Drip Irrigation:</strong> Most efficient, 90-95% efficiency, suitable for row crops</div>
                        <div><strong>Sprinkler System:</strong> Good coverage, 75-85% efficiency, suitable for field crops</div>
                        <div><strong>Surface Irrigation:</strong> Traditional method, 60-70% efficiency, suitable for paddy</div>
                        <div><strong>Micro-sprinklers:</strong> Good for orchards, 80-90% efficiency</div>
                    </div>
                </div>
                <div class="knowledge-item">
                    <h4>Water Requirements</h4>
                    <div class="knowledge-details">
                        <div><strong>Rice:</strong> 1200-1500mm (high water requirement)</div>
                        <div><strong>Wheat:</strong> 450-600mm (moderate requirement)</div>
                        <div><strong>Cotton:</strong> 600-1000mm (moderate to high)</div>
                        <div><strong>Vegetables:</strong> 400-800mm (varies by crop)</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateFertilizersKnowledge() {
        let content = '<div class="knowledge-category"><h3>🧪 Nutrition & Fertilizers</h3>';
        
        Object.entries(this.knowledgeBase.fertilizers).forEach(([nutrient, nutrientData]) => {
            content += `
                <div class="knowledge-item">
                    <h4>${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}</h4>
                    <div class="knowledge-details">
                        <div><strong>Role:</strong> ${nutrientData.role}</div>
                        <div><strong>Deficiency Signs:</strong> ${nutrientData.deficiencySymptoms.join(', ')}</div>
                        <div><strong>Sources:</strong> ${nutrientData.sources.join(', ')}</div>
                        <div><strong>Application:</strong> ${nutrientData.application.join(', ')}</div>
                        <div><strong>Timing:</strong> ${nutrientData.timing.join(', ')}</div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        return content;
    }

    generateEquipmentKnowledge() {
        return `
            <div class="knowledge-category">
                <h3>🚜 Farm Equipment</h3>
                <div class="knowledge-item">
                    <h4>Essential Farm Tools</h4>
                    <div class="knowledge-details">
                        <div><strong>Tractors:</strong> 25-75 HP for small to medium farms</div>
                        <div><strong>Tillers:</strong> For soil preparation and cultivation</div>
                        <div><strong>Seed Drills:</strong> For precise seed placement</div>
                        <div><strong>Sprayers:</strong> For pesticide and fertilizer application</div>
                        <div><strong>Harvesters:</strong> For efficient crop harvesting</div>
                    </div>
                </div>
                <div class="knowledge-item">
                    <h4>Maintenance Tips</h4>
                    <div class="knowledge-details">
                        <div><strong>Regular Service:</strong> Follow manufacturer's schedule</div>
                        <div><strong>Proper Storage:</strong> Clean and store in dry place</div>
                        <div><strong>Lubrication:</strong> Regular greasing of moving parts</div>
                        <div><strong>Seasonal Check:</strong> Pre-season equipment inspection</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Farm Tools functionality
    loadFarmTools() {
        // Tools are loaded from HTML, just set up event handlers
        console.log('Farm tools loaded');
    }

    // Weather functionality
    initializeWeather() {
        this.loadWeatherData();
    }

    loadWeatherData() {
        // Simulate weather data loading
        this.updateCurrentWeather();
        this.updateWeatherForecast();
        this.updateWeatherAlerts();
        this.updateWeatherRecommendations();
    }

    updateCurrentWeather() {
        const currentWeather = document.getElementById('currentWeather');
        if (currentWeather) {
            // This would typically fetch from a weather API
            const weatherData = {
                temperature: '28°C',
                condition: 'Partly Cloudy',
                humidity: '75%',
                wind: '12 km/h',
                pressure: '1013 hPa'
            };
            
            currentWeather.innerHTML = `
                <div class="weather-icon">🌤️</div>
                <div class="temperature">${weatherData.temperature}</div>
                <div class="condition">${weatherData.condition}</div>
                <div class="details">
                    <div class="detail-item">
                        <span>Humidity:</span>
                        <span>${weatherData.humidity}</span>
                    </div>
                    <div class="detail-item">
                        <span>Wind:</span>
                        <span>${weatherData.wind}</span>
                    </div>
                    <div class="detail-item">
                        <span>Pressure:</span>
                        <span>${weatherData.pressure}</span>
                    </div>
                </div>
            `;
        }
    }

    updateWeatherForecast() {
        const forecastList = document.getElementById('forecastList');
        if (forecastList) {
            const forecast = [
                { day: 'Tomorrow', icon: '🌧️', condition: 'Light Rain', temp: '26°C' },
                { day: 'Day 2', icon: '☁️', condition: 'Cloudy', temp: '29°C' },
                { day: 'Day 3', icon: '🌤️', condition: 'Partly Cloudy', temp: '31°C' },
                { day: 'Day 4', icon: '☀️', condition: 'Sunny', temp: '33°C' }
            ];
            
            forecastList.innerHTML = '';
            forecast.forEach(day => {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <div class="forecast-icon">${day.icon}</div>
                    <div class="forecast-text">
                        <strong>${day.day}</strong>
                        <p>${day.condition} - ${day.temp}</p>
                    </div>
                `;
                forecastList.appendChild(forecastItem);
            });
        }
    }

    updateWeatherAlerts() {
        const weatherAlerts = document.getElementById('weatherAlerts');
        if (weatherAlerts) {
            weatherAlerts.innerHTML = `
                <div class="alert-item">
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-text">
                        <strong>Rainfall Expected</strong>
                        <p>Heavy rain expected tomorrow. Consider covering sensitive crops and ensuring proper drainage.</p>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon">🌡️</div>
                    <div class="alert-text">
                        <strong>Temperature Rise</strong>
                        <p>Temperature expected to rise to 33°C by weekend. Increase irrigation frequency.</p>
                    </div>
                </div>
            `;
        }
    }

    updateWeatherRecommendations() {
        const weatherRecommendations = document.getElementById('weatherRecommendations');
        if (weatherRecommendations) {
            weatherRecommendations.innerHTML = `
                <div class="recommendation-item">
                    <div class="rec-icon">🌱</div>
                    <div class="rec-text">
                        <strong>Planting Conditions</strong>
                        <p>Current conditions are favorable for transplanting seedlings. Soil moisture is optimal.</p>
                    </div>
                </div>
                <div class="recommendation-item">
                    <div class="rec-icon">💧</div>
                    <div class="rec-text">
                        <strong>Irrigation Timing</strong>
                        <p>With rain expected, delay irrigation by 2-3 days to avoid waterlogging.</p>
                    </div>
                </div>
                <div class="recommendation-item">
                    <div class="rec-icon">🛡️</div>
                    <div class="rec-text">
                        <strong>Disease Prevention</strong>
                        <p>High humidity may increase fungal disease risk. Apply preventive fungicides.</p>
                    </div>
                </div>
            `;
        }
    }

    // Utility functions
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Tool functions
function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('toolModalTitle');
    const modalBody = document.getElementById('toolModalBody');
    
    modalTitle.textContent = getToolTitle(toolName);
    modalBody.innerHTML = getToolContent(toolName);
    modal.style.display = 'flex';
}

function closeTool() {
    document.getElementById('toolModal').style.display = 'none';
}

function getToolTitle(toolName) {
    const titles = {
        fertilizer: 'Fertilizer Calculator',
        irrigation: 'Irrigation Planner',
        calendar: 'Planting Calendar',
        profit: 'Profit Calculator',
        gdd: 'Growing Degree Days',
        seedrate: 'Seed Rate Calculator'
    };
    return titles[toolName] || 'Farm Tool';
}

function getToolContent(toolName) {
    switch(toolName) {
        case 'fertilizer':
            return `
                <div class="tool-form">
                    <h4>Calculate Fertilizer Requirements</h4>
                    <div class="form-group">
                        <label>Crop Type:</label>
                        <select id="fertilizerCrop">
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="cotton">Cotton</option>
                            <option value="vegetables">Vegetables</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Farm Area (acres):</label>
                        <input type="number" id="farmArea" placeholder="Enter area in acres">
                    </div>
                    <div class="form-group">
                        <label>Soil Test N-P-K (if available):</label>
                        <input type="text" id="soilNPK" placeholder="e.g., 120-45-80 kg/ha">
                    </div>
                    <button class="tool-calculate-btn" onclick="calculateFertilizer()">Calculate</button>
                    <div id="fertilizerResult"></div>
                </div>
            `;
        case 'irrigation':
            return `
                <div class="tool-form">
                    <h4>Create Irrigation Schedule</h4>
                    <div class="form-group">
                        <label>Crop Type:</label>
                        <select id="irrigationCrop">
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="cotton">Cotton</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Soil Type:</label>
                        <select id="soilType">
                            <option value="clay">Clay</option>
                            <option value="loam">Loam</option>
                            <option value="sandy">Sandy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Current Growth Stage:</label>
                        <select id="growthStage">
                            <option value="germination">Germination</option>
                            <option value="vegetative">Vegetative</option>
                            <option value="flowering">Flowering</option>
                            <option value="maturity">Maturity</option>
                        </select>
                    </div>
                    <button class="tool-calculate-btn" onclick="createIrrigationSchedule()">Create Schedule</button>
                    <div id="irrigationResult"></div>
                </div>
            `;
        case 'profit':
            return `
                <div class="tool-form">
                    <h4>Calculate Crop Profitability</h4>
                    <div class="form-group">
                        <label>Crop:</label>
                        <select id="profitCrop">
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="cotton">Cotton</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Area (acres):</label>
                        <input type="number" id="profitArea" placeholder="Enter area in acres">
                    </div>
                    <div class="form-group">
                        <label>Input Cost (₹):</label>
                        <input type="number" id="inputCost" placeholder="Seeds, fertilizer, labor etc.">
                    </div>
                    <div class="form-group">
                        <label>Expected Market Price (₹/kg):</label>
                        <input type="number" id="marketPrice" placeholder="Current market price">
                    </div>
                    <button class="tool-calculate-btn" onclick="calculateProfit()">Calculate Profit</button>
                    <div id="profitResult"></div>
                </div>
            `;
        case 'calendar':
            return `
                <div class="tool-form">
                    <h4>Seasonal Planting Calendar</h4>
                    <div class="form-group">
                        <label>Region:</label>
                        <select id="regionSelect">
                            <option value="north">North India</option>
                            <option value="south">South India</option>
                            <option value="west">West India</option>
                            <option value="east">East India</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Crop Category:</label>
                        <select id="cropCategory">
                            <option value="cereals">Cereals</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="pulses">Pulses</option>
                            <option value="oilseeds">Oilseeds</option>
                        </select>
                    </div>
                    <button class="tool-calculate-btn" onclick="generateCalendar()">Generate Calendar</button>
                    <div id="calendarResult"></div>
                </div>
            `;
        case 'gdd':
            return `
                <div class="tool-form">
                    <h4>Growing Degree Days Calculator</h4>
                    <div class="form-group">
                        <label>Crop:</label>
                        <select id="gddCrop">
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="maize">Maize</option>
                            <option value="cotton">Cotton</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Planting Date:</label>
                        <input type="date" id="plantingDate">
                    </div>
                    <div class="form-group">
                        <label>Average Daily Temperature (°C):</label>
                        <input type="number" id="avgTemp" placeholder="e.g., 25">
                    </div>
                    <div class="form-group">
                        <label>Days Since Planting:</label>
                        <input type="number" id="daysSince" placeholder="Number of days">
                    </div>
                    <button class="tool-calculate-btn" onclick="calculateGDD()">Calculate GDD</button>
                    <div id="gddResult"></div>
                </div>
            `;
        case 'seedrate':
            return `
                <div class="tool-form">
                    <h4>Seed Rate Calculator</h4>
                    <div class="form-group">
                        <label>Crop:</label>
                        <select id="seedCrop">
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="maize">Maize</option>
                            <option value="cotton">Cotton</option>
                            <option value="soybean">Soybean</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Area (acres):</label>
                        <input type="number" id="seedArea" placeholder="Enter area in acres">
                    </div>
                    <div class="form-group">
                        <label>Planting Method:</label>
                        <select id="plantingMethod">
                            <option value="broadcasting">Broadcasting</option>
                            <option value="drilling">Line Drilling</option>
                            <option value="transplanting">Transplanting</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Seed Germination % (if known):</label>
                        <input type="number" id="germination" placeholder="e.g., 85" max="100">
                    </div>
                    <button class="tool-calculate-btn" onclick="calculateSeedRate()">Calculate Seed Rate</button>
                    <div id="seedRateResult"></div>
                </div>
            `;
        default:
            return '<p>Tool content not available.</p>';
    }
}

// Tool calculation functions
function calculateFertilizer() {
    const crop = document.getElementById('fertilizerCrop').value;
    const area = parseFloat(document.getElementById('farmArea').value);
    const soilNPK = document.getElementById('soilNPK').value;
    
    if (!area || area <= 0) {
        document.getElementById('fertilizerResult').innerHTML = '<p style="color: red;">Please enter a valid area.</p>';
        return;
    }
    
    const recommendations = {
        wheat: { N: 120, P: 60, K: 40 },
        rice: { N: 120, P: 60, K: 40 },
        cotton: { N: 120, P: 60, K: 60 },
        vegetables: { N: 150, P: 75, K: 75 }
    };
    
    const rec = recommendations[crop];
    const areaInHectares = area * 0.4047; // Convert acres to hectares
    
    const urea = Math.round((rec.N * areaInHectares) / 0.46); // Urea is 46% N
    const dap = Math.round((rec.P * areaInHectares) / 0.46); // DAP is 46% P2O5
    const mop = Math.round((rec.K * areaInHectares) / 0.6); // MOP is 60% K2O
    
    const totalCost = (urea * 6) + (dap * 25) + (mop * 17); // Approximate prices per kg
    
    document.getElementById('fertilizerResult').innerHTML = `
        <div class="calculation-result">
            <h5>Fertilizer Requirements for ${area} acres of ${crop}:</h5>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Urea (46% N):</strong> ${urea} kg<br>
                    <small>Apply in 2-3 splits</small>
                </div>
                <div class="result-item">
                    <strong>DAP (46% P):</strong> ${dap} kg<br>
                    <small>Apply at planting</small>
                </div>
                <div class="result-item">
                    <strong>MOP (60% K):</strong> ${mop} kg<br>
                    <small>Apply at planting & flowering</small>
                </div>
                <div class="result-item">
                    <strong>Estimated Cost:</strong> ₹${totalCost}<br>
                    <small>Based on current market rates</small>
                </div>
            </div>
            <div class="result-note">
                <strong>Note:</strong> Adjust quantities based on soil test results. Consider organic sources like compost for long-term soil health.
            </div>
        </div>
    `;
}

function createIrrigationSchedule() {
    const crop = document.getElementById('irrigationCrop').value;
    const soilType = document.getElementById('soilType').value;
    const growthStage = document.getElementById('growthStage').value;
    
    const waterRequirements = {
        wheat: { germination: 25, vegetative: 35, flowering: 45, maturity: 20 },
        rice: { germination: 50, vegetative: 60, flowering: 70, maturity: 40 },
        vegetables: { germination: 20, vegetative: 30, flowering: 40, maturity: 25 },
        cotton: { germination: 30, vegetative: 40, flowering: 60, maturity: 30 }
    };
    
    const soilFactors = {
        clay: 1.2,
        loam: 1.0,
        sandy: 0.8
    };
    
    const baseRequirement = waterRequirements[crop][growthStage];
    const adjustedRequirement = Math.round(baseRequirement * soilFactors[soilType]);
    
    const frequency = soilType === 'sandy' ? 2 : soilType === 'clay' ? 5 : 3;
    
    document.getElementById('irrigationResult').innerHTML = `
        <div class="calculation-result">
            <h5>Irrigation Schedule for ${crop} (${growthStage} stage):</h5>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Water Requirement:</strong> ${adjustedRequirement} mm/week<br>
                    <small>Adjusted for ${soilType} soil</small>
                </div>
                <div class="result-item">
                    <strong>Irrigation Frequency:</strong> Every ${frequency} days<br>
                    <small>Based on soil water holding capacity</small>
                </div>
                <div class="result-item">
                    <strong>Best Timing:</strong> Early morning (6-8 AM)<br>
                    <small>Minimal evaporation losses</small>
                </div>
                <div class="result-item">
                    <strong>Critical Periods:</strong> ${growthStage === 'flowering' ? 'Current stage is critical!' : 'Monitor flowering stage'}<br>
                    <small>Never skip irrigation during flowering</small>
                </div>
            </div>
            <div class="weekly-schedule">
                <h6>7-Day Schedule:</h6>
                ${generateWeeklySchedule(frequency)}
            </div>
        </div>
    `;
}

function generateWeeklySchedule(frequency) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let schedule = '<div class="schedule-days">';
    
    days.forEach((day, index) => {
        const shouldIrrigate = index % frequency === 0;
        schedule += `
            <div class="schedule-day ${shouldIrrigate ? 'irrigate-day' : ''}">
                <strong>${day}</strong><br>
                ${shouldIrrigate ? '💧 Irrigate' : '🌱 Monitor'}
            </div>
        `;
    });
    
    schedule += '</div>';
    return schedule;
}

function calculateProfit() {
    const crop = document.getElementById('profitCrop').value;
    const area = parseFloat(document.getElementById('profitArea').value);
    const inputCost = parseFloat(document.getElementById('inputCost').value) || 0;
    const marketPrice = parseFloat(document.getElementById('marketPrice').value);
    
    if (!area || !marketPrice || area <= 0 || marketPrice <= 0) {
        document.getElementById('profitResult').innerHTML = '<p style="color: red;">Please enter valid values for area and market price.</p>';
        return;
    }
    
    const yieldData = {
        wheat: { min: 3.5, max: 5, avg: 4.25 },
        rice: { min: 4, max: 6, avg: 5 },
        vegetables: { min: 25, max: 40, avg: 32.5 },
        cotton: { min: 15, max: 20, avg: 17.5 }
    };
    
    const costData = {
        wheat: 25000,
        rice: 30000,
        vegetables: 50000,
        cotton: 35000
    };
    
    const yieldPerAcre = yieldData[crop].avg * 1000; // Convert tons to kg
    const totalYield = yieldPerAcre * area;
    const totalBaseCost = (costData[crop] * area) + inputCost;
    const grossIncome = totalYield * marketPrice;
    const netProfit = grossIncome - totalBaseCost;
    const roi = ((netProfit / totalBaseCost) * 100).toFixed(1);
    
    document.getElementById('profitResult').innerHTML = `
        <div class="calculation-result">
            <h5>Profitability Analysis for ${area} acres of ${crop}:</h5>
            <div class="result-grid">
                <div class="result-item positive">
                    <strong>Expected Yield:</strong> ${(totalYield/1000).toFixed(1)} tons<br>
                    <small>${yieldPerAcre/1000} tons/acre average</small>
                </div>
                <div class="result-item positive">
                    <strong>Gross Income:</strong> ₹${grossIncome.toLocaleString()}<br>
                    <small>At ₹${marketPrice}/kg market price</small>
                </div>
                <div class="result-item negative">
                    <strong>Total Investment:</strong> ₹${totalBaseCost.toLocaleString()}<br>
                    <small>Including all input costs</small>
                </div>
                <div class="result-item ${netProfit > 0 ? 'positive' : 'negative'}">
                    <strong>Net Profit:</strong> ₹${netProfit.toLocaleString()}<br>
                    <small>ROI: ${roi}%</small>
                </div>
            </div>
            <div class="profit-breakdown">
                <h6>Sensitivity Analysis:</h6>
                <p><strong>Break-even price:</strong> ₹${(totalBaseCost/totalYield).toFixed(2)}/kg</p>
                <p><strong>Profit at different yields:</strong></p>
                <ul>
                    <li>Low yield (${yieldData[crop].min} tons/acre): ₹${((yieldData[crop].min * 1000 * area * marketPrice) - totalBaseCost).toLocaleString()}</li>
                    <li>High yield (${yieldData[crop].max} tons/acre): ₹${((yieldData[crop].max * 1000 * area * marketPrice) - totalBaseCost).toLocaleString()}</li>
                </ul>
            </div>
        </div>
    `;
}

function generateCalendar() {
    const region = document.getElementById('regionSelect').value;
    const category = document.getElementById('cropCategory').value;
    
    const calendars = {
        cereals: {
            north: [
                { crop: 'Wheat', planting: 'Nov-Dec', harvest: 'Apr-May', season: 'Rabi' },
                { crop: 'Rice', planting: 'Jun-Jul', harvest: 'Oct-Nov', season: 'Kharif' },
                { crop: 'Maize', planting: 'Jun-Jul', harvest: 'Sep-Oct', season: 'Kharif' },
                { crop: 'Barley', planting: 'Nov-Dec', harvest: 'Apr-May', season: 'Rabi' }
            ],
            south: [
                { crop: 'Rice', planting: 'Jun-Jul & Dec-Jan', harvest: 'Oct-Nov & Apr-May', season: 'Kharif & Rabi' },
                { crop: 'Maize', planting: 'Jun-Jul', harvest: 'Sep-Oct', season: 'Kharif' },
                { crop: 'Pearl Millet', planting: 'Jun-Jul', harvest: 'Sep-Oct', season: 'Kharif' },
                { crop: 'Finger Millet', planting: 'Jun-Jul', harvest: 'Oct-Nov', season: 'Kharif' }
            ]
        },
        vegetables: {
            north: [
                { crop: 'Tomato', planting: 'Feb-Mar & Jul-Aug', harvest: 'May-Jun & Oct-Nov', season: 'Summer & Kharif' },
                { crop: 'Onion', planting: 'Nov-Dec', harvest: 'Apr-May', season: 'Rabi' },
                { crop: 'Potato', planting: 'Oct-Nov', harvest: 'Feb-Mar', season: 'Rabi' },
                { crop: 'Cabbage', planting: 'Aug-Sep', harvest: 'Nov-Dec', season: 'Winter' }
            ],
            south: [
                { crop: 'Tomato', planting: 'Sep-Oct & Jan-Feb', harvest: 'Dec-Jan & Apr-May', season: 'Post-monsoon & Summer' },
                { crop: 'Brinjal', planting: 'Jun-Jul & Sep-Oct', harvest: 'Sep-Oct & Dec-Jan', season: 'Kharif & Post-monsoon' },
                { crop: 'Okra', planting: 'Feb-Mar & Jun-Jul', harvest: 'May-Jun & Sep-Oct', season: 'Summer & Kharif' },
                { crop: 'Chilli', planting: 'Jun-Jul', harvest: 'Oct-Dec', season: 'Kharif' }
            ]
        }
    };
    
    const regionData = calendars[category][region] || calendars[category].north;
    
    let calendarHTML = `
        <div class="calculation-result">
            <h5>${category.charAt(0).toUpperCase() + category.slice(1)} Planting Calendar - ${region.charAt(0).toUpperCase() + region.slice(1)} India</h5>
            <div class="calendar-grid">
    `;
    
    regionData.forEach(crop => {
        calendarHTML += `
            <div class="calendar-item">
                <strong>${crop.crop}</strong><br>
                <span class="planting-time">🌱 Plant: ${crop.planting}</span><br>
                <span class="harvest-time">🌾 Harvest: ${crop.harvest}</span><br>
                <span class="season-tag">${crop.season}</span>
            </div>
        `;
    });
    
    calendarHTML += `
            </div>
            <div class="calendar-notes">
                <h6>Important Notes:</h6>
                <ul>
                    <li>Timing may vary by 2-3 weeks based on local climate conditions</li>
                    <li>Consider weather forecasts before final planting decisions</li>
                    <li>Adjust planting dates for high-altitude or coastal areas</li>
                    <li>Follow recommended varieties for your specific region</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('calendarResult').innerHTML = calendarHTML;
}

function calculateGDD() {
    const crop = document.getElementById('gddCrop').value;
    const plantingDate = document.getElementById('plantingDate').value;
    const avgTemp = parseFloat(document.getElementById('avgTemp').value);
    const daysSince = parseInt(document.getElementById('daysSince').value);
    
    if (!plantingDate || !avgTemp || !daysSince) {
        document.getElementById('gddResult').innerHTML = '<p style="color: red;">Please fill in all fields.</p>';
        return;
    }
    
    const baseTemperatures = {
        wheat: 0,
        rice: 10,
        maize: 10,
        cotton: 15
    };
    
    const gddRequirements = {
        wheat: { germination: 150, flowering: 1400, maturity: 2000 },
        rice: { germination: 200, flowering: 1200, maturity: 1800 },
        maize: { germination: 100, flowering: 800, maturity: 1400 },
        cotton: { germination: 150, flowering: 1000, maturity: 1600 }
    };
    
    const baseTemp = baseTemperatures[crop];
    const gddPerDay = Math.max(0, avgTemp - baseTemp);
    const accumulatedGDD = gddPerDay * daysSince;
    
    const requirements = gddRequirements[crop];
    let currentStage = 'Germination';
    let nextStage = 'Flowering';
    let progressPercent = 0;
    
    if (accumulatedGDD >= requirements.maturity) {
        currentStage = 'Maturity';
        nextStage = 'Harvest Ready';
        progressPercent = 100;
    } else if (accumulatedGDD >= requirements.flowering) {
        currentStage = 'Flowering';
        nextStage = 'Maturity';
        progressPercent = ((accumulatedGDD - requirements.flowering) / (requirements.maturity - requirements.flowering)) * 100;
    } else if (accumulatedGDD >= requirements.germination) {
        currentStage = 'Vegetative';
        nextStage = 'Flowering';
        progressPercent = ((accumulatedGDD - requirements.germination) / (requirements.flowering - requirements.germination)) * 100;
    } else {
        progressPercent = (accumulatedGDD / requirements.germination) * 100;
    }
    
    document.getElementById('gddResult').innerHTML = `
        <div class="calculation-result">
            <h5>Growing Degree Days Analysis for ${crop}:</h5>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Accumulated GDD:</strong> ${accumulatedGDD.toFixed(0)} units<br>
                    <small>Over ${daysSince} days</small>
                </div>
                <div class="result-item">
                    <strong>Current Stage:</strong> ${currentStage}<br>
                    <small>Progress to ${nextStage}: ${progressPercent.toFixed(1)}%</small>
                </div>
                <div class="result-item">
                    <strong>Daily GDD:</strong> ${gddPerDay.toFixed(1)} units<br>
                    <small>Base temperature: ${baseTemp}°C</small>
                </div>
                <div class="result-item">
                    <strong>Days to ${nextStage}:</strong> ${currentStage === 'Harvest Ready' ? 'Ready now' : Math.ceil((requirements[nextStage.toLowerCase()] - accumulatedGDD) / gddPerDay) + ' days'}<br>
                    <small>At current temperature</small>
                </div>
            </div>
            <div class="gdd-progress">
                <h6>Growth Stage Progress:</h6>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(progressPercent, 100)}%"></div>
                </div>
                <div class="stage-markers">
                    <span class="${accumulatedGDD >= requirements.germination ? 'completed' : ''}">Germination (${requirements.germination})</span>
                    <span class="${accumulatedGDD >= requirements.flowering ? 'completed' : ''}">Flowering (${requirements.flowering})</span>
                    <span class="${accumulatedGDD >= requirements.maturity ? 'completed' : ''}">Maturity (${requirements.maturity})</span>
                </div>
            </div>
        </div>
    `;
}

function calculateSeedRate() {
    const crop = document.getElementById('seedCrop').value;
    const area = parseFloat(document.getElementById('seedArea').value);
    const method = document.getElementById('plantingMethod').value;
    const germination = parseFloat(document.getElementById('germination').value) || 85;
    
    if (!area || area <= 0) {
        document.getElementById('seedRateResult').innerHTML = '<p style="color: red;">Please enter a valid area.</p>';
        return;
    }
    
    const baseSeedRates = {
        wheat: { broadcasting: 40, drilling: 35, transplanting: 30 },
        rice: { broadcasting: 60, drilling: 25, transplanting: 20 },
        maize: { broadcasting: 25, drilling: 20, transplanting: 15 },
        cotton: { broadcasting: 5, drilling: 3, transplanting: 2 },
        soybean: { broadcasting: 80, drilling: 70, transplanting: 60 }
    };
    
    const thousandGrainWeights = {
        wheat: 40,
        rice: 22,
        maize: 300,
        cotton: 100,
        soybean: 150
    };
    
    const baseSeedRate = baseSeedRates[crop][method]; // kg/hectare
    const adjustedSeedRate = (baseSeedRate * 100) / germination; // Adjust for germination %
    const seedRatePerAcre = adjustedSeedRate * 0.4047; // Convert to per acre
    const totalSeedRequired = seedRatePerAcre * area;
    
    const tgw = thousandGrainWeights[crop];
    const seedsPerKg = 1000000 / tgw; // Seeds per kg
    const totalSeeds = totalSeedRequired * seedsPerKg;
    const plantsPerAcre = (totalSeeds / area) * (germination / 100);
    
    const seedCost = {
        wheat: 25,
        rice: 40,
        maize: 300,
        cotton: 500,
        soybean: 80
    };
    
    const totalCost = totalSeedRequired * seedCost[crop];
    
    document.getElementById('seedRateResult').innerHTML = `
        <div class="calculation-result">
            <h5>Seed Rate Calculation for ${area} acres of ${crop}:</h5>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Seed Rate:</strong> ${seedRatePerAcre.toFixed(1)} kg/acre<br>
                    <small>Method: ${method}</small>
                </div>
                <div class="result-item">
                    <strong>Total Seed Required:</strong> ${totalSeedRequired.toFixed(1)} kg<br>
                    <small>For ${area} acres</small>
                </div>
                <div class="result-item">
                    <strong>Plant Population:</strong> ${plantsPerAcre.toFixed(0)}/acre<br>
                    <small>At ${germination}% germination</small>
                </div>
                <div class="result-item">
                    <strong>Estimated Cost:</strong> ₹${totalCost.toLocaleString()}<br>
                    <small>Based on average seed prices</small>
                </div>
            </div>
            <div class="seed-recommendations">
                <h6>Recommendations:</h6>
                <ul>
                    <li><strong>Seed Treatment:</strong> Use fungicide seed treatment before sowing</li>
                    <li><strong>Storage:</strong> Store seeds in dry, cool place before planting</li>
                    <li><strong>Quality:</strong> Use certified seeds with >80% germination rate</li>
                    <li><strong>Backup:</strong> Keep 10% extra seeds for gap filling</li>
                </ul>
            </div>
        </div>
    `;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        closeTool();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.agriBot = new AgriSmartAI();
});