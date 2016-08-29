rm -r build
mkdir build
javac -d ./build *.java
cd build
jar cvf RunSorting.jar *
cp RunSorting.jar ../../../bin/RunSorting.jar
