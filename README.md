**Problem Statement**

2. As the majority of Singapore’s food supply is imported, optimising the supply chain is critical. Implement algorithms that can predict demand, manage inventory and optimise logistics to reduce food waste and streamline supply chain processes.

**Project Name**

Gegagedigedagedago

**Aim**

We hope to:

**Reduce Food Waste:** By accurately predicting demand and managing inventory effectively, the aim is to minimise instances of overstocking perishable goods, consequently reducing food waste.

**Ensure Food Security:** Given Singapore's reliance on imports for the majority of its food supply, optimising the supply chain aims to ensure a steady and reliable flow of food into the country, enhancing overall food security.

**Optimise Costs:** Efficient supply chain management can lead to cost savings through reduced wastage, optimised logistics, and improved inventory management, contributing to overall economic efficiency.

**Enhance Sustainability:** By minimising food waste and optimising logistics, the initiative contributes to broader sustainability goals, reducing the environmental impact associated with food production and transportation.

**Motivation**

**National Resilience:** Enhancing the efficiency and resilience of Singapore's food supply chain is crucial for the nation's stability and sovereignty, especially in times of global disruptions.

**Economic Viability:** Optimizing the supply chain can have significant economic benefits by reducing costs associated with food wastage, transportation, and storage.

**Environmental Concerns:** Addressing food waste contributes to environmental sustainability by reducing greenhouse gas emissions associated with food production, transportation, and disposal.

**Social Responsibility:** Ensuring a reliable and sustainable food supply is a fundamental aspect of social responsibility, ensuring that all segments of society have access to nutritious food.

**Technological Innovation:** Implementing advanced algorithms and technologies not only addresses immediate challenges but also positions Singapore as a leader in leveraging innovation for societal benefit.

**Features**

**LSTM Model to Predict Demand**

**Description**
The bidirectional LSTM model is a type of recurrent neural network that processes data in both forward and backward directions, capturing patterns and dependencies that standard LSTMs might miss. This bidirectional approach is particularly effective in predicting time series data, such as food demand, where understanding both past and future contexts is beneficial.

**Data Collection**
The model is trained on historical food supply and demand data sourced from data.gov.sg. This dataset includes information on various food items, import quantities, consumption rates, seasonal trends, and other relevant factors. The data is cleaned and preprocessed to remove any inconsistencies or missing values, ensuring high-quality input for the model.

**Model Training**
The bidirectional LSTM model is trained on this historical data, learning to recognize patterns and make accurate predictions about future demand. By considering both past and future contexts, the model can provide more accurate and robust predictions compared to traditional models. Training involves feeding the data into the model in sequences, allowing it to learn the temporal dependencies and relationships between different variables.

**Predictive Analytics**
Once trained, the bidirectional LSTM model can predict future food demand with high accuracy. These predictions enable better inventory management and logistics planning. For instance, by knowing the expected demand, import schedules can be optimized to ensure a steady supply without overstocking, thus reducing food waste.

**Dashboard for Monitoring and Decision Making**
To facilitate the use of these predictions, a dashboard is developed. This dashboard provides a comprehensive view of the predicted demand, current inventory levels, and logistical plans. Key features include:

**Graphical Representation:** The dashboard features interactive graphs that display predicted demand trends over time. Users can visualize how demand for different food items is expected to change, enabling proactive decision-making.

**Data Reference:** The dashboard includes an Excel sheet containing the raw and processed data. This allows users to delve into the specifics of the dataset, verify predictions, and conduct further analyses if needed.

**Real-time Updates:** The dashboard is designed to update in real-time, reflecting the latest data and predictions. This ensures that stakeholders always have access to the most current information.

**Prediction**
![image](https://github.com/EthanLoww/LifeHackers-69/assets/156650597/1b554a5e-caa8-48e6-b064-c646ae240f8f)

![image](https://github.com/EthanLoww/LifeHackers-69/assets/156650597/ca2833b0-0484-4e12-a5c7-9452cd1037fc)

**Inventory Management System**
**Description**
The inventory system provides a comprehensive solution for managing inventory, tracking quantities, and monitoring expiry dates, facilitating efficient inventory management and reducing the risk of product spoilage or obsolescence.

**User Interface:** The inventory system features a user-friendly interface accessible via web or mobile application. Upon accessing the system, users are presented with options to add new items, view existing inventory, and manage item details.

**Adding Items:** Users can easily add new items to the inventory by providing relevant details such as the item name, quantity, and expiry date.

**Quantity Management:** For each item added to the inventory, users can specify the quantity available. The system allows for easy updating of quantities as inventory levels change due to purchases, sales, or stock adjustments.

**Expiry Date Tracking:** An essential feature of the inventory system is the ability to track expiry dates for perishable items.

**Design**
![image](https://github.com/EthanLoww/LifeHackers-69/assets/156650597/7549aa3a-4246-49ce-a652-613aef404af6)

**Route Optimisation Algorithm**
**Description**
The route optimisation system utilises the Google Maps API to efficiently plan delivery or transportation routes by calculating the most optimal path between a starting point, an ending point, and a list of intermediate stops. Here's how it works:

**Input Parameters:** The system takes input parameters including the starting point (origin), the ending point (destination), and a list of intermediate stops (waypoints) that need to be visited along the route.

**Data Retrieval:** Using the Google Maps API, the system retrieves relevant geographical and traffic data including real-time traffic conditions, road networks, and distances between locations.

**Route Calculation:** The system then utilises algorithms to calculate the most optimal route considering factors such as distance, traffic congestion, and the estimated time of arrival (ETA). It integrates the provided starting point, ending point, and intermediate stops to create a comprehensive route plan.

**Optimisation Algorithms:** The system employs various optimisation algorithms such as the Traveling Salesman Problem (TSP) or Genetic Algorithms to find the most efficient sequence of stops that minimises total travel time, distance, or cost.

**Real-Time Updates:** The route optimisation system continuously monitors real-time traffic conditions and dynamically adjusts the route if necessary to avoid congestion or road closures, ensuring timely deliveries and efficient transportation.

**Visualisation:** The optimised route is presented visually on a map interface, allowing users to easily visualise the planned route, including the sequence of stops and estimated arrival times at each location.

**Integration with Logistics Systems:** The system can be integrated with existing logistics management systems to seamlessly incorporate optimised routes into daily operations, improving overall efficiency and reducing transportation costs.

**Customization and Scalability:** The route optimisation system can be customised to accommodate specific business requirements and scaled up to handle large volumes of delivery or transportation requests across various industries.

Overall, by leveraging the power of the Google Maps API and advanced optimisation algorithms, the route optimisation system streamlines logistics operations, reduces fuel consumption, and enhances customer satisfaction through timely deliveries.

**Design**
![image](https://github.com/EthanLoww/LifeHackers-69/assets/156650597/d9af6263-acca-4edc-87a4-0fa028cd36a2)

**Sample Route:**
Start: Singapore Zoo, End: Woodlands Checkpoint.
Stops: Marina Bay, Jewel, Pasir Ris Park, Istana, NUS
![image](https://github.com/EthanLoww/LifeHackers-69/assets/156650597/8d7cc79d-aefb-4f5a-a913-21c74f2bee15)

**How does our hack answer the problem statement?**

**LSTM Model for Demand Prediction:**

**Addressing Demand Uncertainty:** By accurately predicting future demand for various food items, the LSTM model helps suppliers and distributors anticipate the quantity of goods needed, reducing the risk of under or overstocking.

**Minimising Food Waste:** With precise demand forecasts, stakeholders can adjust procurement and production schedules accordingly, minimising the likelihood of excess perishable inventory leading to food waste.

**Optimising Supply Chain Efficiency:** Predicting demand enables smoother coordination along the supply chain, from importers to distributors, ensuring that the right quantities of goods are available at the right times, thus enhancing supply chain efficiency.

**Inventory Management System:**

**Efficient Resource Allocation:** The inventory management system facilitates optimal allocation of inventory based on demand predictions and real-time sales data, preventing overstocking and stockouts.

**Reducing Excess Inventory:** By tracking expiry dates and managing inventory levels, the system helps to reduce the amount of expired or spoiled food items, decreasing food waste.

**Enhancing Product Freshness:** With better inventory control, suppliers can prioritise the sale of goods nearing their expiry dates, ensuring fresher products reach consumers and minimising wastage due to spoilage.

**Route Optimization for Logistics:**

**Reducing Transportation Costs:** By optimising delivery routes based on real-time traffic data, logistics costs can be minimised through reduced fuel consumption and vehicle usage.

**Minimising Delivery Time:** Efficient route planning ensures timely deliveries, reducing the time food items spend in transit and decreasing the likelihood of spoilage due to prolonged transportation.

**Improving Supply Chain Resilience:** Optimized logistics operations enhance the resilience of the supply chain by ensuring consistent and reliable delivery of food items, even during periods of disruptions or unexpected events.

In summary, each solution contributes to optimising the supply chain by addressing different aspects of the problem statement, including demand forecasting, inventory management, and logistics optimisation. Together, they help to reduce food waste, improve supply chain efficiency, and ensure the availability of fresh food items in Singapore's import-dependent food supply system.

**How did you build your hack?**
We used JavaScript and React to build the Route Optimisation System and Inventory Management System, and we used Python, JavaScript and React to build the LSTM model to predict future demand. As for the Bidirectional LSTM model and dashboard, we first used TensorFlow to build the model, we got the data from data.gov.sg. We then set up a flask server that relies on the model to re-evaluate and generate the predictions every 1 day, this is so as to update the dashboard and make the analysis as real-time as possible. As for the frontend, we used Nextjs to create the webpage.
