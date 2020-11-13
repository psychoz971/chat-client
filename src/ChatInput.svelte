<script>
  import { supabase } from "./db.js";
  import { messages, user } from "./store.js";

  let message = "";
  $: canSend = function () {
    return message.length > 5;
  };

  async function initMessages() {
    const req = await supabase.from("messages").select("*");
    $messages = req.body.reverse();
  }

  async function handleSubmit() {
    const { data, error } = await supabase.from("messages").insert([
      {
        user: $user.id,
        message: message,
      },
    ]);
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      $messages = [data[0], ...$messages];
      message = "";
    }
  }

  initMessages();
</script>

<style>
  .chat-text {
    display: flex;
  }
  .chat-text-input {
    padding-right: 10px;
  }
</style>

<form class="chat-text" on:submit|preventDefault={handleSubmit}>
  <div class="chat-text-input">
    <textarea type="text" bind:value={message} />
  </div>
  <div class="chat-text-button">
    <button type="submit" disabled={!canSend()}> Envoyer </button>
  </div>
</form>
