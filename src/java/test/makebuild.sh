rm -r build
mkdir build
javac -d ./build *.java
cd build
jar cvf HelloWorld.jar *
