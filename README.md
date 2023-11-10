# Info_SciVis

This repository contains all the codes for the Assignment 2 of the data visualisation course.

## Color Mapping
The plots have been generated using Cartopy and Matplotlib. The codes for this are contained in the folder Color_Mapping. There are 2 notebooks in this part - 

1. animation_color_mapping.ipynb is used to generate the animation files. They take data from all the 9 dates and make animations using them. The animations generated are for all possible color and scale combinations. The colors considered are - Viridis, Cividis, Plasma and Winter, while the scales used are - Logarithmic, Discrete and Continuous.
2. images_color_mapping.ipynb is used to generate the images for the report. The date for the plots is 1 May 2015. The same experimentation has been carried out here as well, along with an additional diverging colormap - bwr (Blue White Red)

## Node Link Diagrams
The plots have been made using Gephi. Preprocessing has been done on the data, to convert it into a format usable by Gephi. This can be found in the node_link.ipynb file in the Node_link folder.
After that, we have created plots in gephi. The 3 workbooks used are gephi_initial.gephi, gephi_positive.gephi and gephi_negative.gephi. THe dataset and image folders have also been attached for completeness.

## Parallel-Co-ordinates plot - 
They have been generated using JavaScript and basic HTML. The steps to run the and view the Parallel Co-ordinates plot.

1. Navigate to PCOP directory `cd PCOP`. We have three various JS files used for plotting three different Parallel Co-ordinates plots.
2. Run ` python3 -m http.server 8888 ` (Install python3 in your system if not available or you can also use VS Code Go Live option after navigating to this directory).
3. Now you will taken to an URL which looks something like this. ![plot](./ReadmeImages/Header.png)
4. Type the name of the HTML file of the PCOP you want to see like this `/<Example.html>`. Press Enter.
5. You will be able to see the PCOP for the required Data. The different colors map to different time of day during accident.

