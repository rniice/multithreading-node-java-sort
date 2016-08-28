/*
 * Original: Copyright (C) 2016 Michael Crockett.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import java.util.Arrays;                                  //import output formatting for arrays
import com.sortingmodules.mergesort.MergeSortDouble;      //import the mergesortDouble library


public class RunSorting {

   /*
    * This is the entry point to the program
    */
    public static void main(String [] args) {
       //extract the length, min, and max of the desired sort from args passed

       System.out.println("Beginning Sorting Doubles Array");


       double [] random_array = generateRandomArray(200, -100.0, 100.0);    //create a random array of doubles
       //System.out.println(Arrays.toString(random_array)); // prints randomly generated array

       MergeSortDouble mergesort_instance = new MergeSortDouble();          //create a mergesort_instance
       mergesort_instance.sort(random_array);                               //use sort() method on random_array
       printArray(random_array);                                            //print out the resulting sorted array

    }

    // generate array of length with random ints
    private static double [] generateRandomArray(int length, double min, double max) {
        double [] result = new double [length];

        for(int i = 0; i < length; i++) {
            result[i] = Math.random() * (max - min) + min;
        }

        return result;
    }

    //output formatting to print the result of an array of doubles
    private static void printArray(double[] anArray) {
       for (int i = 0; i < anArray.length; i++) {
          if (i > 0) {
             System.out.print(", ");
          }
          System.out.print(anArray[i]);
       }
    }
}
