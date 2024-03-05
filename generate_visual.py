import pandas as pd
import matplotlib.pyplot as plt

# Replace 'your_file.csv' with the path to your CSV file
file_path = './visits.csv'

# Read the CSV file
data = pd.read_csv(file_path)

# Sort the data based on the number of visits, descending
sorted_data = data.sort_values('Visits', ascending=False)

# Create a bar chart
plt.figure(figsize=(10, 8)) # You can adjust the figure size as needed
plt.bar(sorted_data['Link'], sorted_data['Visits'], color='blue')

# Rotate the x labels to make them readable
plt.xticks(rotation=90)

# Adding titles and labels
plt.title('Number of Visits per Link')
plt.xlabel('Link')
plt.ylabel('Visits')

# Show the plot
plt.tight_layout() # Adjusts the plot to ensure everything fits without overlapping
plt.savefig('bar_chart.png')
plt.show()
