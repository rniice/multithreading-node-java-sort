/*
 * Modifications: Copyright (C) 2016 Michael Crockett.
 * Copyright (C) 2014 Pedro Vicente Gómez Sánchez.
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
package com.sortingmodules.sortingalgorithm;

/**
 * Interface to be implemented by sorting algorithm implementations in this repository.
 *
 * @modifications Michael Crockett; int[] to double[]
 * @author Pedro Vicente Gómez Sánchez.
 */
public abstract class SortingAlgorithmDouble {

  public abstract void sort(double[] numbers);

  protected void swap(double[] numbers, int i, int j) {
    double temp   = numbers[i];
    numbers[i]    = numbers[j];
    numbers[j]    = temp;
  }

  protected void validateInput(double[] numbers) {
    if (numbers == null) {
      throw new IllegalArgumentException("You can't pass a null instance as parameter.");
    }
  }
}
