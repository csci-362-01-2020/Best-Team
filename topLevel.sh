echo "Showing top level folder information. Close window/ press Ctrl-c to stop script."
echo "<h1> " > Display.html
ls -a >> Display.html
echo "</h1> " >> Display.html
xdg-open Display.html