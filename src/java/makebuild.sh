rm -r build
mkdir build
javac -d ./build *.java
cd build
jar cvf MergeSortBinaries.jar *
