<template>
  <div
    class="modal fade modal-small"
    :id="config.id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    :aria-labelledby="`${config.id}Label`"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" :id="`${config.id}Label`">
            {{ config.title }}
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <p>{{ config.content.text }}</p>
          <div class="col-12">
            <div
              v-for="input in config.content.inputs"
              :key="input.id"
              class="mb-3"
            >
              <label :for="input.id" class="form-label">
                <strong>{{ input.label }}</strong>
              </label>
              <input
                v-if="input.type !== 'textarea'"
                :type="input.type"
                class="form-control"
                :id="input.id"
                :placeholder="input.placeholder"
                :required="input.required"
              />
              <textarea
                v-else
                class="form-control"
                :id="input.id"
                :rows="input.rows"
                :required="input.required"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-between">
          <button
            v-for="(button, index) in config.buttons"
            :key="index"
            type="button"
            class="btn btn-custom btn-icon mx-2 mb-2"
            :data-bs-dismiss="button.dismiss ? 'modal' : null"
          >
            <i :class="button.icon"></i> {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { modalConfig } from "../../bd/bd.js";

export default {
  name: "AppModal",
  data() {
    return {
      config: modalConfig,
    };
  },
};
</script>
