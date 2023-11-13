# Info_SciVis

This repository contains all the codes for the Assignment 2 of the data visualisation course.

## Color Mapping
The plots have been generated using Cartopy and Matplotlib. The codes for this are contained in the folder Color_Mapping. There is 1 notebook in this part - 

1. images_color_mapping.ipynb is used to generate the images for the report. The date for the plots is 1 May 2015. It also plots the videos for the following combinations - Viridis Continuous, Viridis Logarithmic, Viridis Discrete, Cividis Discrete, Plasma Discrete, Winter Discrete and Bwr Discrete. The dates considered for the animations are - 1,11,21 of May,June,July 2015 (total of 9 dates).
 
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


## Quiver Plots
The plots have been made using Python3 with matplotlib and cartopy for plotting and animation. The 'Test_quiver.ipynb' file is used for generating the quiver plots and animations. We have plotted the quiver plots for the entire world and then showed the quiver plots only for India for visualization purposes.

All you have to do for running the code is to move to the respective directory and run the 'Test_quiver.ipynb' file. 

1. `cd Quiver_Plots`
2. Run the 'Test_quiver.ipynb' file.

All the required images will be generated and stored in the respective folder.


## Streamline plots

The plots have been made using Python3 with matplotlib and cartopy for plotting and animation. The 'StreamLine.ipynb' file is used for generating the streamline plots and animations. We have plotted the streamline plots for the entire world and then showed the plots only for India for visualization purposes.

All you have to do for running the code is to move to the respective directory and run the 'StreamLine.ipynb' file. 


1. `cd Quiver_Plots`
2.  Run the 'StreamLine.ipynb' file.

All the required images will be generated and stored in the respective folder.


## Treemap plots - 
In the treemaps directory, we have 4 html files that you can run to see the various plots.

Please note that you will need d3 installed in your system to run the Javascript code for the treemaps.

1. index.html contains the code for the borough-street treemap.
2. squarify.html for the accident-type treemap, plotted using the d3 squarify method.
3. slice.html contians the snake plot for the accident-type data.
