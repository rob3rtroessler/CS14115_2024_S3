# Session 02 | Lab

### Learning Objectives
- Learn how to parse HTML documents
- Learn how to create clean datasets for exploration and visualization

### Useful links
- Regular Expression cheat sheet: https://pythex.org
- Beautiful soup documentation: https://www.crummy.com/software/BeautifulSoup/bs4/doc/

## Part A: Intro to Pandas!

### Understanding dataframes
Let's start by creating a simple list of dictionaries and converting it into a pandas DataFrame.

```python
import pandas as pd

# List of dictionaries
l = [{'a': 1, 'b': 2}, {'a': -2, 'b': 0}]
l

# output:>> [{'a': 1, 'b': 2}, {'a': -2, 'b': 0}]
```

```python
# Creating DataFrame from list of dicts
df = pd.DataFrame(l)
df

# output:>>
#    a  b
# 0  1  2
# 1 -2  0
```

```python
# Printing index
print(df.index)

# output:>> RangeIndex(start=0, stop=2, step=1)
```

```python
# Printing values
print(df.values)

# output:>> [[ 1  2]
#            [-2  0]]
```

```python
# Checking the type of a column
print(type(df['a']))

# output:>> <class 'pandas.core.series.Series'>
```

```python
# Loading data from a CSV file
df = pd.read_csv('data/students.csv')
df.head()

# sample output:>> 
#    Student ID     Name  Age  Program
# 0           1    Alice   20  Physics
# 1           2      Bob   22  Biology
# 2           3  Charlie   23  Chemistry
# 3           4    David   21  Physics
# 4           5      Eve   22  Biology

```

```python
# Checking the shape of the DataFrame
print(df.shape)

# output:>> (100, 4)

```

```python
# Descriptive statistics
print(df.describe())

# sample output:>> 
#        Student ID         Age
# count   100.00000  100.000000
# mean     50.50000   21.500000
# std      29.01149    1.122497
# min       1.00000   19.000000
# 25%      25.75000   20.750000
# 50%      50.50000   21.500000
# 75%      75.25000   22.250000
# max     100.00000   24.000000

```

### Filtering, Subsetting, Sorting, and Counting
Boolean indexing allows us to filter data based on conditions. Let's explore some filtering techniques.


```python
# Filtering rows where column 'a' is greater than 0
filtered_df = df[df['a'] > 0]
filtered_df

# output:>>
#    a  b
# 0  1  2
```

```python
# Using .loc[] for label-based indexing
subset_df = df.loc[:, ['a', 'b']]
subset_df

# output:>> 
#    a  b
# 0  1  2
# 1 -2  0

```

```python
# Using .iloc[] for positional indexing
subset_df = df.iloc[:, [0, 1]]
subset_df


# output:>> 
#    a  b
# 0  1  2
# 1 -2  0

```

```python
# Sorting DataFrame by column 'a'
sorted_df = df.sort_values(by='a')
sorted_df

# output:>> 
#    a  b
# 1 -2  0
# 0  1  2
```

```python
# Counting unique values in 'program' column and plotting the top 10 most frequent ones
df['program'].value_counts()[:10].plot(kind='bar')

# (This will display a bar plot of the top 10 most frequent programs)
```


## Part B: Parsing Data with Regular Expressions
We often encounter and have to work with datasets that include errors or extraneous information or miss data.
In order to create workable datasets, we need to "clean" this raw data. For example, we might want to
replace special characters such as commas from text data or remove extra spaces. Regular Expressions (RegEx) is a tiny, specialized
programming language that helps us do just that. RegEx allows us to define search patterns and replace the pattern
or return the contents  that match the pattern. Python includes a module called *re* that makes Regular Expressions available.

### 1. Finding Patterns
Let's begin with finding individual characters. Type the following into a jupyter notebook cell:
```python
import re

url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = '[a]'
re.findall(pattern, url)

# output:>> ['a', 'a', 'a']
```

The brackets [] denotes "matches any of these chars". This means that you can simply list all characters that you want to find.

```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = '[ast-vC]'
re.findall(pattern, url)

# output:>> ['t', 't', 't', 'a', 't', 't', 'a', 'v', 'a']
```

Instead of looking for individual characters, RegEx also allows you to look for special sequences and let's you quantify your pattern through the use of special characters. For example, \d matches any digit and + means "1 or more occurrences".

```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = '[a-zA-Z]+'
re.findall(pattern, url)

# output:>> ['article', 'mens', 'tennis', 'Williams', 'transfer']
```

Now it's your turn. Change the below (fill in the blank), so that you will get the following output:
```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = '_____'
re.findall(pattern, url)

# output:>> ['article', '2024', '6', '17', 'mens', 'tennis', 'Williams', 'transfer']
```

Now write a RegEx that extracts the date in the format YYYY-MM-DD.
```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = r'/article/(\d{4})/(\d{1,2})/(\d{1,2})/'
match = re.search(pattern, url)
if match:
    year, month, day = match.groups()
    date = f'{year}-{int(month):02d}-{int(day):02d}'
    print(date)

# output:>> '2024-06-17'
```
Here is more practice with finding dates:
```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = '_____'
re.findall(pattern, url)

# output:>> ['2024', '6', '17']
```

```python
url = '/article/2024/6/17/mens-tennis-Williams-transfer/'

pattern = r'/article/(\d{4})/(\d{1,2})/(\d{1,2})/'
year, month, day = re.search(pattern, url).groups()
year, month, day

# output:>> ('2024', '6', '17')
```


### 2. Replacing Text
Let's now get to substituting characters and start with straightforward example, in which we define a pattern that we then
substitute. 
```python
import re

sentence = "Harvard was established in 1636! In 1638, it acquired British North America's first known printing press?"

pattern = '[?!]'
sentence = re.sub(pattern, '.', sentence)

print(sentence)

# output:>> Harvard was established in 1636. In 1638, it acquired British North America's first known printing press.
```
Let's look at a more complicated search pattern. In a group, look at the below search pattern and explain what it does 
and what the output is. This [cheat sheet](https://pythex.org) might prove useful.

```python
import re

sentence = "Harvard was established in 1636??!! In 1638, it acquired British North America's first known printing press ..."

pattern = '[?!]+|\s*\.+'
sentence = re.sub(pattern, '.', sentence)

print(sentence)

# output:>> 
```

## Part C: Requests and Beautiful Soup
In data science, it is very common that you want to work with data that is not available in a csv or txt file and that can
only be found on the web. In order to access this data, we need to build a web scraper that extracts content from a
webpage which in turn will allow you to perform searches on and manipulate that data.

### 1. Requests
The Python library Requests allows you to fetch a webpage.

```python
import requests

wiki_url = "https://en.wikipedia.org/wiki/Nobel_Peace_Prize"
wiki_page = requests.get(wiki_url)
wiki_page.status_code

```
It is always helpful to check whether your request was successful. status_code does this for you. 200 means success. 404 means page not found.

### 2. Beautiful Soup
While Requests gets a webpage for you, Beautiful Soup helps you parse a webpage. This means that Beautiful Soup will help you
extract the information from the requested webpage that you actually need. In order to construct a HTML-parsed Beautiful Soup object,
run the following code:

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(wiki_page.content, "html.parser")

```

The prettify() function in BeautifulSoup will enable us to view how the tags are nested in the document, which will help you in the next step, i.e.
extracting the information that you actually care about.

```python
print(soup.prettify())
```

Once you know what you are looking for, Beautiful Soup allows you to extract this data. Here are a few helpful functions. Find()
returns the first element matching your specifications, while find_all returns a list of all elements matching your specifications.
```python
soup.find("h2")
soup.find_all("div", class_="thumb tright")
```
Adding text returns the in an html element.

```python
headings = soup.find_all("h2")
for element in headings:
    print(element.text)
```

Get allows you to extract content from attributes.
```python
headings = soup.find_all("a")
for element in headings:
    print(element.get('href'))
```

### Congratulations! You've completed  today's lab!
